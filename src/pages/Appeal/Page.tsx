import { Scale } from "lucide-react";
import { DataTable } from "./DataTable/data-table";
import { appealColumns } from "./DataTable/columns";

export default function AppealPage() {
  return (
    <div className="container pb-4">
      <h2 className="text-lg font-bold mb-4 flex gap-2 items-center">
        <Scale /> Pengajuan Banding
      </h2>
      <DataTable columns={appealColumns} />
    </div>
  );
}
