import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from "recharts";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const COLORS = [
  "#2563eb", // blue
  "#f59e42", // orange
  "#10b981", // green
  "#ef4444", // red
  "#8b5cf6", // purple
  "#ec4899", // pink
  "#06b6d4", // cyan
  "#84cc16", // lime
  "#f97316", // orange-500
  "#a855f7", // purple-500
];

interface TicketStatusChartProps {
  range: string;
  dashboardData?: any;
}

export function TicketStatusChart({ range, dashboardData }: TicketStatusChartProps) {
  const getData = () => {
    if (!dashboardData) {
      // Fallback data if API data is not available
      const fallbackData = {
        "3": [
          { name: "Tilang", value: 21 },
          { name: "Himbauan", value: 15 },
          { name: "Persidangan", value: 14 },
          { name: "Sudah Bayar", value: 7 },
          { name: "Pengajuan Banding", value: 3 },
          { name: "Banding Diterima", value: 5 },
        ],
        "6": [
          { name: "Tilang", value: 45 },
          { name: "Himbauan", value: 32 },
          { name: "Persidangan", value: 28 },
          { name: "Sudah Bayar", value: 15 },
          { name: "Pengajuan Banding", value: 8 },
          { name: "Banding Diterima", value: 12 },
        ],
        "12": [
          { name: "Tilang", value: 89 },
          { name: "Himbauan", value: 67 },
          { name: "Persidangan", value: 54 },
          { name: "Sudah Bayar", value: 32 },
          { name: "Pengajuan Banding", value: 18 },
          { name: "Banding Diterima", value: 25 },
        ],
      };
      return fallbackData[range as keyof typeof fallbackData] || fallbackData["6"];
    }

    // Use API data
    const rangeData = dashboardData[`last_${range}_months`];
    if (!rangeData?.ticket_status_summary) {
      return [];
    }

    // Convert the ticket status data to chart format
    return Object.entries(rangeData.ticket_status_summary).map(([name, value]) => ({
      name,
      value: value as number,
    }));
  };

  const chartData = getData();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Status Tiket</CardTitle>
        <CardDescription>Distribusi status tiket {range} bulan terakhir</CardDescription>
      </CardHeader>
      <CardContent className="h-full">
        <div className="w-full h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={chartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}>
                {chartData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value: number) => `${value} tiket`} />
              <Legend verticalAlign="bottom" iconType="circle" />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
