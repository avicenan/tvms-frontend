"use client";

// import { Bar, BarChart } from "recharts";

// import { ChartConfig } from "@/components/ui/chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartArea, LucideFileWarning, Ticket, Car, DollarSign, TrendingUp, TrendingDown, MapPin, AlertTriangle, TrafficCone } from "lucide-react";
import { ViolationTypeChart } from "./violation-types";
import { ViolationTrendsChart } from "./violation-trends";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";
import { useSearchParams } from "react-router-dom";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const MONTHS = [
  { value: "3", label: "3 Bulan Terakhir" },
  { value: "6", label: "6 Bulan Terakhir" },
  { value: "12", label: "12 Bulan Terakhir" },
];

// Data statistik pelanggaran untuk setiap range
const STATS_DATA = {
  "3": [
    {
      title: "Total Pelanggaran",
      value: "4.223",
      change: "+25%",
      trend: "up",
      icon: AlertTriangle,
      description: "dari 3 bulan sebelumnya",
      color: "text-red-500",
    },
    {
      title: "Total Penilangan",
      value: "3.876",
      change: "-12%",
      trend: "down",
      icon: Ticket,
      description: "dari 3 bulan sebelumnya",
      color: "text-blue-500",
    },
    {
      title: "Total Denda",
      value: "Rp 450 Jt",
      change: "+18%",
      trend: "up",
      icon: DollarSign,
      description: "dari 3 bulan sebelumnya",
      color: "text-green-500",
    },
    {
      title: "Kendaraan Tertilang",
      value: "3.765",
      change: "+8%",
      trend: "up",
      icon: Car,
      description: "dari 3 bulan sebelumnya",
      color: "text-purple-500",
    },
  ],
  "6": [
    {
      title: "Total Pelanggaran",
      value: "12.223",
      change: "+15%",
      trend: "up",
      icon: AlertTriangle,
      description: "dari 6 bulan sebelumnya",
      color: "text-red-500",
    },
    {
      title: "Total Penilangan",
      value: "9.876",
      change: "-8%",
      trend: "down",
      icon: Ticket,
      description: "dari 6 bulan sebelumnya",
      color: "text-blue-500",
    },
    {
      title: "Total Denda",
      value: "Rp 1,2 M",
      change: "+12%",
      trend: "up",
      icon: DollarSign,
      description: "dari 6 bulan sebelumnya",
      color: "text-green-500",
    },
    {
      title: "Kendaraan Tertilang",
      value: "8.765",
      change: "+5%",
      trend: "up",
      icon: Car,
      description: "dari 6 bulan sebelumnya",
      color: "text-purple-500",
    },
  ],
  "12": [
    {
      title: "Total Pelanggaran",
      value: "24.223",
      change: "+22%",
      trend: "up",
      icon: AlertTriangle,
      description: "dari 12 bulan sebelumnya",
      color: "text-red-500",
    },
    {
      title: "Total Penilangan",
      value: "19.876",
      change: "-5%",
      trend: "down",
      icon: Ticket,
      description: "dari 12 bulan sebelumnya",
      color: "text-blue-500",
    },
    {
      title: "Total Denda",
      value: "Rp 2,4 M",
      change: "+20%",
      trend: "up",
      icon: DollarSign,
      description: "dari 12 bulan sebelumnya",
      color: "text-green-500",
    },
    {
      title: "Kendaraan Tertilang",
      value: "18.765",
      change: "+12%",
      trend: "up",
      icon: Car,
      description: "dari 12 bulan sebelumnya",
      color: "text-purple-500",
    },
  ],
};

// Data untuk card kontekstual
const CONTEXTUAL_DATA = {
  "3": {
    mostCommonViolation: {
      title: "Pelanggaran Terbanyak",
      value: "Tidak Menggunakan Helm",
      count: "1.321 kasus",
      icon: AlertTriangle,
      color: "text-orange-500",
      description: "Data 3 bulan terakhir",
    },
    topRegion: {
      title: "Wilayah Terbanyak",
      value: "Jakarta Selatan",
      count: "810 kasus",
      icon: MapPin,
      color: "text-cyan-600",
      description: "Data 3 bulan terakhir",
    },
  },
  "6": {
    mostCommonViolation: {
      title: "Pelanggaran Terbanyak",
      value: "Tidak Menggunakan Helm",
      count: "4.321 kasus",
      icon: AlertTriangle,
      color: "text-orange-500",
      description: "Data 6 bulan terakhir",
    },
    topRegion: {
      title: "Wilayah Terbanyak",
      value: "Jakarta Selatan",
      count: "2.110 kasus",
      icon: MapPin,
      color: "text-cyan-600",
      description: "Data 6 bulan terakhir",
    },
  },
  "12": {
    mostCommonViolation: {
      title: "Pelanggaran Terbanyak",
      value: "Tidak Menggunakan Helm",
      count: "8.321 kasus",
      icon: AlertTriangle,
      color: "text-orange-500",
      description: "Data 12 bulan terakhir",
    },
    topRegion: {
      title: "Wilayah Terbanyak",
      value: "Jakarta Selatan",
      count: "4.110 kasus",
      icon: MapPin,
      color: "text-cyan-600",
      description: "Data 12 bulan terakhir",
    },
  },
};

export default function DashboardPage() {
  const { logout } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const currentRange = searchParams.get("range") || "6";

  const handleRangeChange = (value: string) => {
    setSearchParams({ range: value });
  };

  const statsData = STATS_DATA[currentRange as keyof typeof STATS_DATA];
  const contextualData = CONTEXTUAL_DATA[currentRange as keyof typeof CONTEXTUAL_DATA];

  return (
    <div className="container pb-4">
      <div className="flex items-center justify-between mb-4">
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
          <button
            onClick={() => {
              logout();
            }}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Keluar
          </button>
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-2">
        <div className="grid auto-rows-min gap-2 md:grid-cols-4">
          {statsData.map((stat, index) => {
            const Icon = stat.icon;
            const TrendIcon = stat.trend === "up" ? TrendingUp : TrendingDown;
            const trendColor = stat.trend === "up" ? "text-emerald-500" : "text-rose-500";

            return (
              <Card key={index} className="gap-2">
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    <div className="">{stat.title}</div>
                    <Icon size={16} className={stat.color} />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold mb-1">{stat.value}</div>
                  <div className="flex items-center text-sm text-zinc-500">
                    <TrendIcon size={14} className={cn("mr-1", trendColor)} />
                    <span className={trendColor}>{stat.change}</span>
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
          <ViolationTypeChart range={currentRange} />
          <ViolationTrendsChart range={currentRange} />
        </div>
      </div>
    </div>
  );
}
