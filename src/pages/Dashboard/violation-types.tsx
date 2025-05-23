import { TrendingUp } from "lucide-react";
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from "recharts";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const DATA_3_MONTHS = [
  { name: "Tidak Pakai Helm", value: 486 },
  { name: "Terobos Lampu Merah", value: 305 },
  { name: "Muatan Berlebih", value: 237 },
  { name: "Melebihi Kecepatan", value: 173 },
];

const DATA_6_MONTHS = [
  { name: "Tidak Pakai Helm", value: 186 },
  { name: "Terobos Lampu Merah", value: 305 },
  { name: "Muatan Berlebih", value: 237 },
  { name: "Melebihi Kecepatan", value: 73 },
];

const DATA_12_MONTHS = [
  { name: "Tidak Pakai Helm", value: 986 },
  { name: "Terobos Lampu Merah", value: 805 },
  { name: "Muatan Berlebih", value: 637 },
  { name: "Melebihi Kecepatan", value: 473 },
  { name: "Parkir Liar", value: 321 },
  { name: "Tidak Menggunakan Sabuk", value: 245 },
];

const COLORS = [
  "#2563eb", // blue
  "#f59e42", // orange
  "#10b981", // green
  "#ef4444", // red
  "#8b5cf6", // purple
  "#ec4899", // pink
];

interface ViolationTypeChartProps {
  range: string;
}

export function ViolationTypeChart({ range }: ViolationTypeChartProps) {
  const getData = () => {
    switch (range) {
      case "3":
        return DATA_3_MONTHS;
      case "12":
        return DATA_12_MONTHS;
      default:
        return DATA_6_MONTHS;
    }
  };

  const chartData = getData();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Jenis Pelanggaran</CardTitle>
        <CardDescription>Distribusi pelanggaran {range} bulan terakhir</CardDescription>
      </CardHeader>
      <CardContent className="h-full">
        <div className="w-full h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={chartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value: number) => `${value} kasus`} />
              <Legend verticalAlign="bottom" iconType="circle" />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
