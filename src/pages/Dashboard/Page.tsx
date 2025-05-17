"use client";

// import { Bar, BarChart } from "recharts";

// import { ChartConfig } from "@/components/ui/chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideFileWarning } from "lucide-react";
import { ViolationTypeChart } from "./violation-types";
import { ViolationTrendsChart } from "./violation-trends";
import { useAuth } from "@/context/AuthContext";

// const chartData = [
//   { month: "January", desktop: 186, mobile: 80 },
//   { month: "February", desktop: 305, mobile: 200 },
//   { month: "March", desktop: 237, mobile: 120 },
//   { month: "April", desktop: 73, mobile: 190 },
//   { month: "May", desktop: 209, mobile: 130 },
//   { month: "June", desktop: 214, mobile: 140 },
// ];

// const chartConfig = {
//   desktop: {
//     label: "Desktop",
//     color: "#2563eb",
//   },
//   mobile: {
//     label: "Mobile",
//     color: "#60a5fa",
//   },
// } satisfies ChartConfig;

export default function DashboardPage() {
  const { logout } = useAuth();
  return (
    <>
      <div className="flex flex-1 flex-col gap-2 pt-0">
        <div className="flex justify-end mb-4">
          <button
            onClick={() => {
              logout();
            }}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Logout
          </button>
        </div>
        <div className="grid auto-rows-min gap-2 md:grid-cols-4">
          <Card className="gap-2">
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <div className="">Total Pelanggaran</div>
                <LucideFileWarning size={16} className="text-zinc-600" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-1">12,223</div>
              <div className="text-sm text-zinc-500">+15% from previous month</div>
            </CardContent>
          </Card>
          <Card className="gap-2">
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <div className="">Total Penilangan</div>
                <LucideFileWarning size={16} className="text-zinc-600" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-1">12,223</div>
              <div className="text-sm text-zinc-500">+15% from previous month</div>
            </CardContent>
          </Card>
          <Card className="gap-2">
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <div className="">Total Denda</div>
                <LucideFileWarning size={16} className="text-zinc-600" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-1">Rp. 12,223</div>
              <div className="text-sm text-zinc-500">+15% from previous month</div>
            </CardContent>
          </Card>
          <Card className="gap-2">
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <div className="">Total Kendaraan Tilang</div>
                <LucideFileWarning size={16} className="text-zinc-600" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-1">12,223</div>
              <div className="text-sm text-zinc-500">+15% from previous month</div>
            </CardContent>
          </Card>
        </div>
        <div className="grid auto-rows-min gap-2 md:grid-cols-3">
          <div className="col-span-2">
            <ViolationTypeChart />
          </div>
          <ViolationTrendsChart />
          {/* <div className="md:col-span-2">05</div>
          <div>06</div>
          <div className="md:row-span-2">07</div>
          <div>08</div>
          <div>09</div>
          <div>10</div> */}
        </div>
      </div>
    </>
  );
}
