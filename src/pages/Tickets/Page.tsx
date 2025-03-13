import { useEffect, useState } from "react";
import { DataTable } from "./TicketTable/data-table";
import { Loader } from "lucide-react";
import { AllTicketTable } from "./AllTicketTable/data-table";
import { allTicketColumns, Ticket } from "./AllTicketTable/columns";
import { ticketColumns } from "./TicketTable/columns";

async function getData(): Promise<Ticket[]> {
  // Fetch data from your API here.
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return [
    {
      id: 1,
      unique_id: "212xer",
      vehicle_no: "B2938KKK",
      type: "Helm",
      datetime: "2023-01-01 10:00:00",
      officer: "Nurman",
      location: "Jl. Telekomunikasi, Jakarta",
      status: "Terdeteksi",
    },
    {
      id: 2,
      unique_id: "212xer",
      vehicle_no: "B7765KOK",
      type: "Helm",
      datetime: "2023-01-01 10:00:00",
      officer: "Nurman",
      location: "Jl. Telekomunikasi, Jakarta",
      status: "Tilang",
    },
    {
      id: 2,
      unique_id: "212xer",
      vehicle_no: "B7765KOK",
      type: "Helm",
      datetime: "2023-01-01 10:00:00",
      officer: "Nurman",
      location: "Jl. Telekomunikasi, Jakarta",
      status: "Selesai",
    },
  ];
}
export default function TicketsPage() {
  const [data, setData] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getData();
      setData(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center gap-2 text-zinc-600">
        <Loader className="animate-spin" /> Memuat...
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-lg font-bold mb-4">Kasus Sedang Ditangani</h2>
      <DataTable columns={ticketColumns} data={data} />
      <h2 className="text-lg font-bold mb-4">Semua Kasus</h2>
      <AllTicketTable columns={allTicketColumns} data={data} />
    </div>
  );
}
