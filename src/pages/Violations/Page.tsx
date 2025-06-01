import { columns } from "./DataTable/columns";
import { DataTable } from "./DataTable/data-table";
import { TrafficCone } from "lucide-react";

export default function ViolationsPage() {
  return (
    <div className="">
      <h1 className="flex items-center gap-2 text-lg font-bold mb-4">
        <TrafficCone /> Pelanggaran Terdeteksi
      </h1>
      <DataTable columns={columns} />
    </div>
  );
}
