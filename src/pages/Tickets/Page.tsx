import { useEffect, useState } from "react";
import { DataTable } from "./DataTable/data-table";
import { Loader, Ticket } from "lucide-react";
import { ticketColumns, TicketType } from "./DataTable/columns";

async function getData(): Promise<TicketType[]> {
  // Fetch data from your API here.
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return [
    {
      id: 1,
      unique_id: "212xer",
      vehicle_no: "B2938KKK",
      type: "Helm",
      datetime: "01/01/2023 10:00:00 PM",
      officer: "Nurman",
      location: "Jl. Telekomunikasi, Jakarta",
      status: "Tilang",
    },
    {
      id: 2,
      unique_id: "212xer",
      vehicle_no: "B7765KOK",
      type: "Helm",
      datetime: "01/01/2023 10:00:00 PM",
      officer: "Nurman",
      location: "Jl. Telekomunikasi, Jakarta",
      status: "Himbauan",
    },
    {
      id: 2,
      unique_id: "212xer",
      vehicle_no: "B7765KOK",
      type: "Helm",
      datetime: "01/01/2023 10:00:00 PM",
      officer: "Nurman",
      location: "Jl. Telekomunikasi, Jakarta",
      status: "Persidangan",
    },
    {
      id: 2,
      unique_id: "212xer",
      vehicle_no: "B7765KOK",
      type: "Helm",
      datetime: "01/01/2023 10:00:00 PM",
      officer: "Nurman",
      location: "Jl. Telekomunikasi, Jakarta",
      status: "Sudah Bayar",
    },
    {
      id: 2,
      unique_id: "212xer",
      vehicle_no: "B7765KOK",
      type: "Helm",
      datetime: "01/01/2023 10:00:00 PM",
      officer: "Nurman",
      location: "Jl. Telekomunikasi, Jakarta",
      status: "Lewat Tenggat",
    },
  ];
}
export default function TicketsPage() {
  const [data, setData] = useState<TicketType[]>([]);
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
      <h2 className="text-lg font-bold mb-4 flex gap-2 items-center">
        <Ticket /> Ticket
      </h2>
      <DataTable columns={ticketColumns} data={data} />
    </div>
  );
}
