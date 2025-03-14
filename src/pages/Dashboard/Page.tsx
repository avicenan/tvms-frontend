"use client";

import { Bar, BarChart } from "recharts";

import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { Card } from "@/components/ui/card";

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#2563eb",
  },
  mobile: {
    label: "Mobile",
    color: "#60a5fa",
  },
} satisfies ChartConfig;

export default function DashboardPage() {
  return (
    // <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
    //   <BarChart accessibilityLayer data={chartData}>
    //     <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
    //     <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
    //   </BarChart>
    // </ChartContainer>
    <>
      <div className="flex flex-1 flex-col gap-4 pt-0">
        <div className="grid auto-rows-min gap-4 md:grid-cols-3 *:bg-zinc-200 *:min-h-36 *:h-full">
          <div>01</div>
          <div>02</div>
          <div>03</div>
          <div>04</div>
          <div className="md:col-span-2">05</div>
          <div>06</div>
          <div className="md:row-span-2">07</div>
          <div>08</div>
          <div>09</div>
          <div>10</div>
        </div>
      </div>
    </>
  );
}
