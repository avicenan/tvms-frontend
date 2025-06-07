import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ChartArea } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonPage() {
  return (
    <div className="container pb-4">
      <div className="flex items-start justify-between mb-4">
        <h1 className="text-lg font-bold flex gap-2 items-center">
          <ChartArea /> Dasbor
        </h1>
        <div className="flex items-center gap-4">
          <Skeleton className="h-10 w-[180px]" />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid auto-rows-min gap-2 md:grid-cols-4">
        {[1, 2, 3, 4].map((index) => (
          <Card key={index} className="gap-2">
            <CardHeader>
              <Skeleton className="h-6 w-3/4" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-1/2 mb-2" />
              <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-24" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Contextual Cards */}
      <div className="grid auto-rows-min gap-2 md:grid-cols-2 mt-4">
        <Card className="flex-row flex items-center gap-4 p-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="flex-1">
            <Skeleton className="h-4 w-32 mb-2" />
            <Skeleton className="h-6 w-48 mb-2" />
            <Skeleton className="h-3 w-40" />
          </div>
        </Card>
        <Card className="flex-row flex items-center gap-4 p-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="flex-1">
            <Skeleton className="h-4 w-32 mb-2" />
            <Skeleton className="h-6 w-48 mb-2" />
            <Skeleton className="h-3 w-40" />
          </div>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid auto-rows-min gap-2 md:grid-cols-2 mt-4">
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-48 mb-2" />
            <Skeleton className="h-4 w-64" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-80 w-full" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-48 mb-2" />
            <Skeleton className="h-4 w-64" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-80 w-full" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
