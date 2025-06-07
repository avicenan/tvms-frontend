import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Cctv, Loader } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonPage() {
  return (
    <div className="container pb-4">
      <h1 className="text-lg font-bold mb-4 flex gap-2 items-center">
        <Cctv /> Siaran Langsung
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3, 4].map((index) => (
          <Card key={index} className="overflow-hidden">
            <CardHeader>
              <Skeleton className="h-6 w-3/4" />
            </CardHeader>
            <CardContent>
              <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                  <div className="text-center">
                    <Loader className="h-8 w-8 animate-spin mx-auto mb-2 text-white" />
                    <Skeleton className="h-4 w-24 mx-auto bg-white/20" />
                  </div>
                </div>
                <Skeleton className="w-full h-full" />
                <div className="absolute top-2 right-2">
                  <Skeleton className="h-6 w-20 bg-black/70" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
