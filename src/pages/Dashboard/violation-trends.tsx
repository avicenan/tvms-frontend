"use client";

import { TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

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
  "Tidak Pakai Helm": "#2563eb", // blue
  "Terobos Lampu Merah": "#f59e42", // orange
  "Muatan Berlebih": "#10b981", // green
  "Melebihi Kecepatan": "#ef4444", // red
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
}

export function ViolationTrendsChart({ range }: ViolationTrendsChartProps) {
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
              {Object.keys(COLORS).map((key) => (
                <Line key={key} type="monotone" dataKey={key} stroke={COLORS[key as keyof typeof COLORS]} strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
