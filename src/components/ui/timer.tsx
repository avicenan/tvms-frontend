import { Timer } from "lucide-react";
import { useEffect, useState } from "react";

interface TimerProps {
  time: number;
  className?: string;
  onLast10Sec?: () => void;
  onTimeout?: () => void;
}

export default function TimerUI({ time, className, onLast10Sec, onTimeout }: TimerProps) {
  const [count, setCount] = useState(time);

  // console.log("rendering timer...");

  useEffect(() => {
    const timer = setInterval(() => {
      setCount(count - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [count]);

  if (onTimeout && count === 0) {
    onTimeout();
  }

  if (onLast10Sec && count === 10) {
    onLast10Sec();
  }

  return (
    <div className={`flex text-lg font-bold items-center ${className}`}>
      <Timer />
      {`${Math.floor(count / 3600)}:${Math.floor((count % 3600) / 60)
        .toString()
        .padStart(2, "0")}:${(count % 60).toString().padStart(2, "0")}`}
    </div>
  );
}
