import { Camera } from "lucide-react";
import { ViolationReportForm } from "./violation-report-form";

export default function Home() {
  return (
    <div className="pb-4">
      <h1 className="text-lg font-bold mb-4 flex gap-2 items-center">
        <Camera /> Lapor Pelanggaran
      </h1>
      <ViolationReportForm />
    </div>
  );
}
