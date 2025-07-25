"use client";

import { CartesianGrid, Line, LineChart, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// Fallback data in case API doesn't provide trend data
const DATA_3_MONTHS = [
  {
    bulan: "Apr",
    "Tidak Pakai Helm": 73,
    "Terobos Lampu Merah": 190,
    "Muatan Berlebih": 130,
    "Melebihi Kecepatan": 140,
  },
  {
    bulan: "Mei",
    "Tidak Pakai Helm": 209,
    "Terobos Lampu Merah": 130,
    "Muatan Berlebih": 140,
    "Melebihi Kecepatan": 150,
  },
  {
    bulan: "Jun",
    "Tidak Pakai Helm": 214,
    "Terobos Lampu Merah": 140,
    "Muatan Berlebih": 150,
    "Melebihi Kecepatan": 160,
  },
];

const DATA_6_MONTHS = [
  {
    bulan: "Jan",
    "Tidak Pakai Helm": 186,
    "Terobos Lampu Merah": 305,
    "Muatan Berlebih": 237,
    "Melebihi Kecepatan": 73,
  },
  {
    bulan: "Feb",
    "Tidak Pakai Helm": 305,
    "Terobos Lampu Merah": 200,
    "Muatan Berlebih": 120,
    "Melebihi Kecepatan": 190,
  },
  {
    bulan: "Mar",
    "Tidak Pakai Helm": 237,
    "Terobos Lampu Merah": 120,
    "Muatan Berlebih": 190,
    "Melebihi Kecepatan": 130,
  },
  {
    bulan: "Apr",
    "Tidak Pakai Helm": 73,
    "Terobos Lampu Merah": 190,
    "Muatan Berlebih": 130,
    "Melebihi Kecepatan": 140,
  },
  {
    bulan: "Mei",
    "Tidak Pakai Helm": 209,
    "Terobos Lampu Merah": 130,
    "Muatan Berlebih": 140,
    "Melebihi Kecepatan": 150,
  },
  {
    bulan: "Jun",
    "Tidak Pakai Helm": 214,
    "Terobos Lampu Merah": 140,
    "Muatan Berlebih": 150,
    "Melebihi Kecepatan": 160,
  },
];

const DATA_12_MONTHS = [
  {
    bulan: "Jul",
    "Tidak Pakai Helm": 186,
    "Terobos Lampu Merah": 305,
    "Muatan Berlebih": 237,
    "Melebihi Kecepatan": 73,
  },
  {
    bulan: "Agu",
    "Tidak Pakai Helm": 305,
    "Terobos Lampu Merah": 200,
    "Muatan Berlebih": 120,
    "Melebihi Kecepatan": 190,
  },
  {
    bulan: "Sep",
    "Tidak Pakai Helm": 237,
    "Terobos Lampu Merah": 120,
    "Muatan Berlebih": 190,
    "Melebihi Kecepatan": 130,
  },
  {
    bulan: "Okt",
    "Tidak Pakai Helm": 73,
    "Terobos Lampu Merah": 190,
    "Muatan Berlebih": 130,
    "Melebihi Kecepatan": 140,
  },
  {
    bulan: "Nov",
    "Tidak Pakai Helm": 209,
    "Terobos Lampu Merah": 130,
    "Muatan Berlebih": 140,
    "Melebihi Kecepatan": 150,
  },
  {
    bulan: "Des",
    "Tidak Pakai Helm": 214,
    "Terobos Lampu Merah": 140,
    "Muatan Berlebih": 150,
    "Melebihi Kecepatan": 160,
  },
  {
    bulan: "Jan",
    "Tidak Pakai Helm": 186,
    "Terobos Lampu Merah": 305,
    "Muatan Berlebih": 237,
    "Melebihi Kecepatan": 73,
  },
  {
    bulan: "Feb",
    "Tidak Pakai Helm": 305,
    "Terobos Lampu Merah": 200,
    "Muatan Berlebih": 120,
    "Melebihi Kecepatan": 190,
  },
  {
    bulan: "Mar",
    "Tidak Pakai Helm": 237,
    "Terobos Lampu Merah": 120,
    "Muatan Berlebih": 190,
    "Melebihi Kecepatan": 130,
  },
  {
    bulan: "Apr",
    "Tidak Pakai Helm": 73,
    "Terobos Lampu Merah": 190,
    "Muatan Berlebih": 130,
    "Melebihi Kecepatan": 140,
  },
  {
    bulan: "Mei",
    "Tidak Pakai Helm": 209,
    "Terobos Lampu Merah": 130,
    "Muatan Berlebih": 140,
    "Melebihi Kecepatan": 150,
  },
  {
    bulan: "Jun",
    "Tidak Pakai Helm": 214,
    "Terobos Lampu Merah": 140,
    "Muatan Berlebih": 150,
    "Melebihi Kecepatan": 160,
  },
];

const COLORS = {
  "Tidak Menggunakan Helm": "#2563eb", // blue
  "Terobos Lampu Merah": "#f59e42", // orange
  "Muatan Berlebih": "#10b981", // green
  "Melebihi Kecepatan": "#ef4444", // red
  "Parkir Liar": "#8b5cf6", // purple
  "Tidak Menggunakan Sabuk": "#ec4899", // pink
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 border rounded-lg shadow-lg">
        <p className="font-medium mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} style={{ color: entry.color }} className="text-sm">
            {entry.name}: {entry.value} kasus
          </p>
        ))}
      </div>
    );
  }
  return null;
};

interface ViolationTrendsChartProps {
  range: string;
  dashboardData?: any;
}

// Helper function to convert API trend data to chart format
const convertTrendDataToChartFormat = (violationTrend: any, range: string) => {
  if (!violationTrend) return null;

  // Get the months based on range
  const getMonthsForRange = (range: string) => {
    const currentDate = new Date();
    const months = [];

    for (let i = parseInt(range) - 1; i >= 0; i--) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
      const monthName = date.toLocaleDateString("en-US", { month: "long" });
      const shortMonthName = date.toLocaleDateString("en-US", { month: "short" });
      months.push({ full: monthName, short: shortMonthName });
    }

    return months;
  };

  const months = getMonthsForRange(range);

  // Convert to chart data format
  const chartData = months.map(({ full, short }) => {
    const monthData: any = { bulan: short };

    // Add data for each violation type
    Object.keys(violationTrend).forEach((violationType) => {
      monthData[violationType] = violationTrend[violationType][full] || 0;
    });

    return monthData;
  });

  return chartData;
};

export function ViolationTrendsChart({ range, dashboardData }: ViolationTrendsChartProps) {
  const getData = () => {
    if (!dashboardData) {
      // Fallback to hardcoded data if no API data
      switch (range) {
        case "3":
          return DATA_3_MONTHS;
        case "12":
          return DATA_12_MONTHS;
        default:
          return DATA_6_MONTHS;
      }
    }

    // Try to get the range data
    const rangeKey = `last_${range}_months` as keyof typeof dashboardData;
    const rangeData = dashboardData[rangeKey];

    if (!rangeData?.violation_trend) {
      // Fallback to hardcoded data if no trend data
      switch (range) {
        case "3":
          return DATA_3_MONTHS;
        case "12":
          return DATA_12_MONTHS;
        default:
          return DATA_6_MONTHS;
      }
    }

    // Convert API trend data to chart format
    const chartData = convertTrendDataToChartFormat(rangeData.violation_trend, range);

    if (!chartData || chartData.length === 0) {
      // Fallback to hardcoded data if conversion failed
      switch (range) {
        case "3":
          return DATA_3_MONTHS;
        case "12":
          return DATA_12_MONTHS;
        default:
          return DATA_6_MONTHS;
      }
    }

    return chartData;
  };

  const chartData = getData();

  // Get unique violation types from the data for dynamic colors
  const getViolationTypes = () => {
    if (chartData.length === 0) return Object.keys(COLORS);

    const types = new Set<string>();
    chartData.forEach((item: any) => {
      Object.keys(item).forEach((key) => {
        if (key !== "bulan") {
          types.add(key);
        }
      });
    });

    return Array.from(types);
  };

  const violationTypes = getViolationTypes();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tren Pelanggaran</CardTitle>
        <CardDescription>Perkembangan jumlah pelanggaran per jenis dalam {range} bulan terakhir</CardDescription>
      </CardHeader>
      <CardContent className="h-full">
        <div className="w-full h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 10,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="bulan" tickLine={false} axisLine={false} tickMargin={8} />
              <YAxis tickLine={false} axisLine={false} tickMargin={8} tickFormatter={(value) => `${value}`} />
              <Tooltip content={<CustomTooltip />} />
              {violationTypes.map((violationType, index) => (
                <Line key={violationType} type="monotone" dataKey={violationType} stroke={COLORS[violationType as keyof typeof COLORS] || `hsl(${index * 60}, 70%, 50%)`} strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
