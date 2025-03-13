"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { Eye } from "lucide-react";
import { Link } from "react-router-dom";

export type Ticket = {
  id: number;
  unique_id: string;
  vehicle_no: string;
  type: string;
  datetime: string;
  location: string;
  officer: string;
  status: string;
  ticket_no?: string | null;
};

export const allTicketColumns: ColumnDef<Ticket>[] = [
  {
    accessorKey: "unique_id",
    header: "ID",
  },
  {
    accessorKey: "vehicle_no",
    header: "No. Kendaraan",
    cell: ({ row }) => (
      <Badge variant={"outline"} className="rounded-none outline-1 outline-dark font-mono font-bold">
        {row.original.vehicle_no}
      </Badge>
    ),
  },
  {
    accessorKey: "type",
    header: "Pelanggaran",
  },
  {
    accessorKey: "datetime",
    header: "Waktu",
  },
  {
    accessorKey: "officer",
    header: "Penyidik",
  },
  {
    accessorKey: "location",
    header: "Lokasi",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      switch (status.toLowerCase()) {
        case "terdeteksi":
          return <Badge>{status}</Badge>;
        case "tilang":
          return <Badge variant={"outline"}>{status}</Badge>;
        case "banding":
          return <Badge variant={"outline"}>{status}</Badge>;
        case "selesai":
          return <Badge variant={"outline"}>{status}</Badge>;
        case "lewat tenggat":
          return <Badge variant={"destructive"}>{status}</Badge>;
      }
    },
  },
  {
    accessorKey: "aksi",
    cell: ({ row }) => {
      const ticket = row.original;
      // switch (ticket.status.toLowerCase()) {
      //   case "terdeteksi":
      //     return (
      //       <div className="flex gap-2">
      //         <Button variant={"ghost"} asChild>
      //           <Link to={`/d/tickets/${ticket.unique_id}`}>Proses</Link>
      //         </Button>
      //       </div>
      //     );
      //   case "tilang":
      //     return (
      //       <div className="flex gap-2">
      //         <Button variant={"ghost"} asChild>
      //           <Link to={`/d/tickets/${ticket.ticket_no}`}>
      //             Surat Tilang <SquareArrowOutUpRight />
      //           </Link>
      //         </Button>
      //       </div>
      //     );
      //   case "banding":
      //     return (
      //       <div className="flex gap-2">
      //         <Link to={`/d/tickets/${ticket.unique_id}`}>
      //           <h1>Banding</h1>
      //         </Link>
      //       </div>
      //     );
      //   case "selesai":
      //     return (
      //       <Button variant={"ghost"} asChild>
      //         <Link to={`/d/tickets/${ticket.ticket_no}`}>
      //           Lihat <Eye />
      //         </Link>
      //       </Button>
      //     );
      //   case "lewat tenggat":
      //     return (
      //       <div className="flex gap-2">
      //         <Link to={`/d/tickets/${ticket.unique_id}`}>
      //           <h1>Lewat Tenggat</h1>
      //         </Link>
      //       </div>
      //     );
      // }
      return (
        <Button variant={"ghost"} asChild>
          <Link to={`/d/tickets/${ticket.ticket_no}`}>
            Lihat <Eye />
          </Link>
        </Button>
      );
    },
  },
];
