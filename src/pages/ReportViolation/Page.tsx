import { ViolationReportForm } from "./violation-report-form";

export default function Home() {
  return (
    <div className="">
      <h1 className="flex-none scroll-m-20 text-lg font-bold tracking-tight lg:text-xl mb-8">Lapor Pelanggaran</h1>
      <ViolationReportForm />
    </div>
  );
}
