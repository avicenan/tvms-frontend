import { DataTable } from "./DataTable/data-table";
import { Ticket } from "lucide-react";
import { ticketColumns } from "./DataTable/columns";

export default function TicketsPage() {
  return (
    <div className="container pb-4">
      <h1 className="text-lg font-bold mb-4 flex gap-2 items-center">
        <Ticket /> Surat Tilang
      </h1>
      <DataTable columns={ticketColumns} />
    </div>
  );
}
