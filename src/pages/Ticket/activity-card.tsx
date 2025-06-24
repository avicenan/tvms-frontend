import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { History, Ticket } from "lucide-react";
import { ActivityType } from "@/lib/types";
import { useRef, useState } from "react";

export default function ActivityCard({ data }: { data: ActivityType[] }) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showTopGradient, setShowTopGradient] = useState(false);
  const [showBottomGradient, setShowBottomGradient] = useState(true);

  const handleScroll = () => {
    const target = scrollContainerRef.current;
    if (!target) return;

    const isAtTop = target.scrollTop === 0;
    const isAtBottom = target.scrollHeight - target.scrollTop === target.clientHeight;

    setShowTopGradient(!isAtTop);
    setShowBottomGradient(!isAtBottom);
  };

  return (
    <Card>
      <CardHeader>
        <span className="flex items-center gap-2 font-semibold text-lg">
          <History className="text-primary" /> Aktivitas
        </span>
      </CardHeader>

      <CardContent className="relative">
        <div ref={scrollContainerRef} className="flex flex-col gap-4 max-h-[300px] overflow-y-auto scroll-smooth pr-2 pb-8" onScroll={handleScroll}>
          <div className={`top-gradient absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-gray-100 to-transparent pointer-events-none transition-opacity duration-200 ${showTopGradient ? "opacity-100" : "opacity-0"}`} />

          {data.map((item, index) => (
            <div key={index} className="flex gap-2">
              <Button variant={"secondary"} className="mt-1">
                <Ticket />
              </Button>
              <div className="flex flex-1">
                <div className="flex-1">
                  <p className="font-medium text-sm">{item.name}</p>
                  <p className="text-xs text-zinc-500 line-clamp-2">{item.description}</p>
                </div>
                <div className="flex flex-intial justify-end items-start">
                  <p className="text-xs text-zinc-500">{new Date(item.created_at).toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "numeric", year: "numeric", hour: "numeric", minute: "numeric" })}</p>
                </div>
              </div>
            </div>
          ))}

          <div className={`bottom-gradient absolute bottom-0 left-0 right-2 h-12 bg-gradient-to-t from-gray-100 to-transparent pointer-events-none transition-opacity duration-200 ${showBottomGradient ? "opacity-100" : "opacity-0"}`} />
        </div>
      </CardContent>
    </Card>
  );
}
