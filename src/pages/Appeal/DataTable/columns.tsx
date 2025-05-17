import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AppealType } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table";
import { Ticket } from "lucide-react";
import { Link } from "react-router-dom";

export const appealColumns: ColumnDef<AppealType>[] = [
  {
    header: "No. Tilang",
    accessorKey: "ticket_id",
    cell: ({ row }) => <div className="max-w-20 truncate">{row.original.ticket_id}</div>,
  },
  {
    header: "Tanggal",
    accessorKey: "created_at",
    cell: ({ row }) => <span>{new Date(row.original.created_at).toLocaleString("id-ID", { dateStyle: "short", timeStyle: "short" })}</span>,
  },
  {
    header: "No. Kendaraan",
    accessorKey: "vehicle_number",
    cell: ({ row }) => {
      return (
        <Badge variant={"outline"} className="rounded-none border-0 outline-1 outline-dark font-mono font-bold text-md">
          {/* {row.original.number} */}
          B7821KKK
        </Badge>
      );
    },
  },
  {
    header: "Argumen",
    accessorKey: "argument",
    cell: ({ row }) => <div className="max-w-80 truncate">"{row.original.argument}"</div>,
  },
  {
    header: "Status",
    accessorKey: "status",
    cell: ({ row }) => {
      const status = row.original.status;
      return (
        <Badge
          variant={"outline"}
          className={` ${
            status.toLowerCase() === "pending"
              ? "bg-yellow-100 text-yellow-800"
              : status.toLowerCase() === "accepted"
              ? "bg-green-100 text-green-800"
              : status.toLowerCase() === "rejected"
              ? "bg-red-100 text-red-800"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          <span className={`w-2 h-2 me-1 text-xs font-semibold rounded-full bg-zinc-400`} />
          {status}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <Button variant={"outline"} asChild>
        <Link to={`/d/tickets/${row.original.ticket_id}`}>
          <Ticket /> Surat Tilang
        </Link>
      </Button>
    ),
  },
];
