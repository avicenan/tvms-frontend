import { useEffect, useState } from "react";
import { DataTable } from "./DataTable/data-table";
import { Loader, Ticket } from "lucide-react";
import { ticketColumns, TicketType } from "./DataTable/columns";
import { ticketApi } from "@/lib/api";

// async function getData(): Promise<TicketType[]> {
//   // Fetch data from your API here.
//   await new Promise((resolve) => setTimeout(resolve, 1000));
//   return [
//     {
//       id: 1,
//       unique_id: "212xer",
//       vehicle_no: "B2938KKK",
//       type: "Helm",
//       datetime: "01/01/2023 10:00:00 PM",
//       officer: "Nurman",
//       location: "Jl. Telekomunikasi, Jakarta",
//       status: "Tilang",
//     },
//     {
//       id: 2,
//       unique_id: "212xer",
//       vehicle_no: "B7765KOK",
//       type: "Helm",
//       datetime: "01/01/2023 10:00:00 PM",
//       officer: "Nurman",
//       location: "Jl. Telekomunikasi, Jakarta",
//       status: "Himbauan",
//     },
//     {
//       id: 2,
//       unique_id: "212xer",
//       vehicle_no: "B7765KOK",
//       type: "Helm",
//       datetime: "01/01/2023 10:00:00 PM",
//       officer: "Nurman",
//       location: "Jl. Telekomunikasi, Jakarta",
//       status: "Persidangan",
//     },
//     {
//       id: 2,
//       unique_id: "212xer",
//       vehicle_no: "B7765KOK",
//       type: "Helm",
//       datetime: "01/01/2023 10:00:00 PM",
//       officer: "Nurman",
//       location: "Jl. Telekomunikasi, Jakarta",
//       status: "Sudah Bayar",
//     },
//     {
//       id: 2,
//       unique_id: "212xer",
//       vehicle_no: "B7765KOK",
//       type: "Helm",
//       datetime: "01/01/2023 10:00:00 PM",
//       officer: "Nurman",
//       location: "Jl. Telekomunikasi, Jakarta",
//       status: "Lewat Tenggat",
//     },
//   ];
// }

export default function TicketsPage() {
  const [data, setData] = useState<TicketType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await ticketApi.getTickets();
      console.log("TICKET", response.data.data);
      setData(response.data.data);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-4rem)] gap-2">
        <Loader className="h-8 w-8 animate-spin" /> <p className="text-sm">Memuat Data...</p>
      </div>
    );
  }

  return (
    <div className="container pb-4">
      <h1 className="text-lg font-bold mb-4 flex gap-2 items-center">
        <Ticket /> Surat Tilang
      </h1>
      <DataTable columns={ticketColumns} data={data} />
    </div>
  );
}
