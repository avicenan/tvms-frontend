import { CheckCircle2Icon, CircleAlert } from "lucide-react";

export default function NotificationIcon({ isSent }: { isSent: boolean }) {
  if (isSent) {
    return <CheckCircle2Icon color="black" fill="blue" fillOpacity={0.5} className="mt-[2px]" />;
  }
  return <CircleAlert color="black" fill="yellow" fillOpacity={0.5} className="mt-[2px]" />;
}
