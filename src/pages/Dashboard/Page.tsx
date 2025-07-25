"use client";

// import { Bar, BarChart } from "recharts";

// import { ChartConfig } from "@/components/ui/chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartArea, Ticket, Car, DollarSign, TrendingUp, TrendingDown, MapPin, AlertTriangle } from "lucide-react";
import { TicketStatusChart } from "./ticket-status";
import { ViolationTrendsChart } from "./violation-trends";
import { cn } from "@/lib/utils";
import { useSearchParams } from "react-router-dom";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEffect, useState, useRef } from "react";
import SkeletonPage from "./skeleton-page";
import { useInView } from "framer-motion";
import { dashboardApi } from "@/lib/api";

const MONTHS = [
  { value: "3", label: "3 Bulan Terakhir" },
  { value: "6", label: "6 Bulan Terakhir" },
  { value: "12", label: "12 Bulan Terakhir" },
];

// Interface for API response
interface DashboardData {
  last_3_months: {
    violations: { count: number; change: number };
    tickets: { count: number; change: number };
    vehicles: { count: number; change: number };
    amount: { sum: number; change: number };
    highest_violation_type: Record<string, number>;
    most_violation_location: { location: string; count: number };
    violation_trend?: Record<string, Record<string, number>>;
    ticket_status_summary?: Record<string, number>;
  };
  last_6_months: {
    violations: { count: number; change: number };
    tickets: { count: number; change: number };
    vehicles: { count: number; change: number };
    amount: { sum: number; change: number };
    highest_violation_type: Record<string, number>;
    most_violation_location: { location: string; count: number };
    violation_trend?: Record<string, Record<string, number>>;
    ticket_status_summary?: Record<string, number>;
  };
  last_12_months?: {
    violations: { count: number; change: number };
    tickets: { count: number; change: number };
    vehicles: { count: number; change: number };
    amount: { sum: number; change: number };
    highest_violation_type: Record<string, number>;
    most_violation_location: { location: string; count: number };
    violation_trend?: Record<string, Record<string, number>>;
    ticket_status_summary?: Record<string, number>;
  };
}

// Counter component for animated numbers
function Counter({ value, isCurrency = false }: { value: number; isCurrency?: boolean }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isInView) {
      const duration = 1000; // 1 second
      const steps = 60;
      const increment = value / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(current);
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  // Format the number
  const formatNumber = (num: number) => {
    if (isCurrency) {
      return `Rp ${Math.floor(num).toLocaleString()}`;
    } else {
      return Math.floor(num).toLocaleString();
    }
  };

  return <span ref={ref}>{isInView ? formatNumber(count) : "0"}</span>;
}

// Helper function to get stats data from API response
const getStatsData = (data: DashboardData, range: string) => {
  const rangeKey = `last_${range}_months` as keyof DashboardData;
  const rangeData = data[rangeKey];

  // If the requested range is not available, fallback to 6 months
  if (!rangeData && range !== "6") {
    return getStatsData(data, "6");
  }

  if (!rangeData) {
    // Fallback data if no API data is available
    return [
      {
        title: "Total Pelanggaran",
        value: 0,
        change: 0,
        trend: "up" as const,
        icon: AlertTriangle,
        description: `dari ${range} bulan sebelumnya`,
        color: "text-red-500",
      },
      {
        title: "Total Penilangan",
        value: 0,
        change: 0,
        trend: "up" as const,
        icon: Ticket,
        description: `dari ${range} bulan sebelumnya`,
        color: "text-blue-500",
      },
      {
        title: "Total Denda",
        value: 0,
        change: 0,
        trend: "up" as const,
        icon: DollarSign,
        description: `dari ${range} bulan sebelumnya`,
        color: "text-green-500",
        isCurrency: true,
      },
      {
        title: "Kendaraan Tertilang",
        value: 0,
        change: 0,
        trend: "up" as const,
        icon: Car,
        description: `dari ${range} bulan sebelumnya`,
        color: "text-purple-500",
      },
    ];
  }

  return [
    {
      title: "Total Pelanggaran",
      value: rangeData.violations.count,
      change: rangeData.violations.change,
      trend: rangeData.violations.change >= 0 ? "up" : "down",
      icon: AlertTriangle,
      description: `dari ${range} bulan sebelumnya`,
      color: "text-red-500",
    },
    {
      title: "Total Penilangan",
      value: rangeData.tickets.count,
      change: rangeData.tickets.change,
      trend: rangeData.tickets.change >= 0 ? "up" : "down",
      icon: Ticket,
      description: `dari ${range} bulan sebelumnya`,
      color: "text-blue-500",
    },
    {
      title: "Total Denda",
      value: rangeData.amount.sum,
      change: rangeData.amount.change,
      trend: rangeData.amount.change >= 0 ? "up" : "down",
      icon: DollarSign,
      description: `dari ${range} bulan sebelumnya`,
      color: "text-green-500",
      isCurrency: true,
    },
    {
      title: "Kendaraan Tertilang",
      value: rangeData.vehicles.count,
      change: rangeData.vehicles.change,
      trend: rangeData.vehicles.change >= 0 ? "up" : "down",
      icon: Car,
      description: `dari ${range} bulan sebelumnya`,
      color: "text-purple-500",
    },
  ];
};

// Helper function to get contextual data from API response
const getContextualData = (data: DashboardData, range: string) => {
  const rangeKey = `last_${range}_months` as keyof DashboardData;
  const rangeData = data[rangeKey];

  // If the requested range is not available, fallback to 6 months
  if (!rangeData && range !== "6") {
    return getContextualData(data, "6");
  }

  if (!rangeData) {
    // Fallback data if no API data is available
    return {
      mostCommonViolation: {
        title: "Pelanggaran Terbanyak",
        value: "Tidak ada data",
        count: "0 kasus",
        icon: AlertTriangle,
        color: "text-orange-500",
        description: `Data ${range} bulan terakhir`,
      },
      topRegion: {
        title: "Wilayah Terbanyak",
        value: "Tidak ada data",
        count: "0 kasus",
        icon: MapPin,
        color: "text-cyan-600",
        description: `Data ${range} bulan terakhir`,
      },
    };
  }

  // Get the highest violation type
  const highestViolationType = Object.entries(rangeData.highest_violation_type)[0];

  return {
    mostCommonViolation: {
      title: "Pelanggaran Terbanyak",
      value: highestViolationType[0],
      count: `${highestViolationType[1]} kasus`,
      icon: AlertTriangle,
      color: "text-orange-500",
      description: `Data ${range} bulan terakhir`,
    },
    topRegion: {
      title: "Wilayah Terbanyak",
      value: rangeData.most_violation_location.location,
      count: `${rangeData.most_violation_location.count} kasus`,
      icon: MapPin,
      color: "text-cyan-600",
      description: `Data ${range} bulan terakhir`,
    },
  };
};

export default function DashboardPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const currentRange = searchParams.get("range") || "6";

  const handleRangeChange = (value: string) => {
    setSearchParams({ range: value });
  };

  // Fetch dashboard data
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await dashboardApi.getDashboard();
        setDashboardData(response.data);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setError("Gagal memuat data dashboard");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (isLoading) {
    return <SkeletonPage />;
  }

  if (error || !dashboardData) {
    return (
      <div className="container pb-4">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Gagal Memuat Data</h3>
            <p className="text-muted-foreground">{error || "Data tidak tersedia"}</p>
          </div>
        </div>
      </div>
    );
  }

  const statsData = getStatsData(dashboardData, currentRange);
  const contextualData = getContextualData(dashboardData, currentRange);

  return (
    <div className="container pb-4">
      <div className="flex items-start justify-between mb-4">
        <h1 className="text-lg font-bold flex gap-2 items-center">
          <ChartArea /> Dasbor
        </h1>
        <div className="flex items-center gap-4">
          <Select value={currentRange} onValueChange={handleRangeChange}>
            <SelectTrigger className="w-[180px] bg-white">
              <SelectValue placeholder="Pilih rentang waktu" />
            </SelectTrigger>
            <SelectContent>
              {MONTHS.map((month) => (
                <SelectItem key={month.value} value={month.value}>
                  {month.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-2">
        <div className="grid auto-rows-min gap-2 md:grid-cols-4">
          {statsData.map((stat, index) => {
            const Icon = stat.icon;
            const TrendIcon = stat.trend === "up" ? TrendingUp : TrendingDown;
            const trendColor = stat.trend === "up" ? "text-emerald-500" : "text-rose-500";
            const changeText = stat.change >= 0 ? `+${stat.change}%` : `${stat.change}%`;

            return (
              <Card key={index} className="gap-2">
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    <div className="">{stat.title}</div>
                    <Icon size={16} className={stat.color} />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold mb-1">
                    <Counter value={stat.value} isCurrency={stat.isCurrency} />
                  </div>
                  <div className="flex items-center text-sm text-zinc-500">
                    <TrendIcon size={14} className={cn("mr-1", trendColor)} />
                    <span className={trendColor}>{changeText}</span>
                    <span className="ml-1">{stat.description}</span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
        <div className="grid auto-rows-min gap-2 md:grid-cols-2">
          <Card className="flex-row flex items-center gap-4 p-4">
            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-orange-100">
              <contextualData.mostCommonViolation.icon className={contextualData.mostCommonViolation.color + " h-7 w-7"} />
            </div>
            <div>
              <div className="text-sm text-muted-foreground font-medium">{contextualData.mostCommonViolation.title}</div>
              <div className="text-lg font-bold leading-tight">{contextualData.mostCommonViolation.value}</div>
              <div className="text-xs text-muted-foreground">
                {contextualData.mostCommonViolation.count} &middot; {contextualData.mostCommonViolation.description}
              </div>
            </div>
          </Card>
          <Card className="flex-row flex items-center gap-4 p-4">
            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-cyan-100">
              <contextualData.topRegion.icon className={contextualData.topRegion.color + " h-7 w-7"} />
            </div>
            <div>
              <div className="text-sm text-muted-foreground font-medium">{contextualData.topRegion.title}</div>
              <div className="text-lg font-bold leading-tight">{contextualData.topRegion.value}</div>
              <div className="text-xs text-muted-foreground">
                {contextualData.topRegion.count} &middot; {contextualData.topRegion.description}
              </div>
            </div>
          </Card>
        </div>
        <div className="grid auto-rows-min gap-2 md:grid-cols-2">
          <TicketStatusChart range={currentRange} dashboardData={dashboardData} />
          <ViolationTrendsChart range={currentRange} dashboardData={dashboardData} />
        </div>
      </div>
    </div>
  );
}
