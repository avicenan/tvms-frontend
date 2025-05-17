import { appealApi } from "@/lib/api";
import { Loader, Scale } from "lucide-react";
import { useEffect, useState } from "react";
import { DataTable } from "./DataTable/data-table";
import { AppealType } from "@/lib/types";
import { appealColumns } from "./DataTable/columns";

// const getDataTable = async () => {
//   return [
//     {
//       id: 3,
//       ticket_id: "12693c75-d955-41c3-9735-1f3e07ef917e",
//       argument: "motor sudah pindah tangan",
//       evidence: "appeal_evidences/Mk5icdzfiUL9KDpaMqWJqJkexhkSs5FvI8lyrBDA.jpg",
//       is_accepted: false,
//       note: "",
//       created_at: "2025-05-16T06:45:37.000000Z",
//       updated_at: "2025-05-16T06:45:37.000000Z",
//     },
//   ];
// };

export default function AppealPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [appeals, setAppeals] = useState<AppealType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await appealApi.getAppeals();
      setAppeals(response.data.data);
      console.log(response.data.data, "ini data");
      setIsLoading(false);
    };
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center gap-2 text-zinc-600 py-10">
        <Loader className="animate-spin" /> Memuat...
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-lg font-bold mb-4 flex gap-2 items-center">
        <Scale /> Pengajuan Banding
      </h2>
      <DataTable columns={appealColumns} data={appeals} />
    </div>
  );
}
