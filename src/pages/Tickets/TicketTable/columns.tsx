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

export const ticketColumns: ColumnDef<Ticket>[] = [
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
          return <Badge className="rounded-0 bg-yellow-600/50 border border-yellow-600 text-foreground">{status}</Badge>;
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
    id: "aksi",
    cell: ({ row }) => {
      const ticket = row.original;
      return (
        <Button variant={"ghost"} className="font-normal" asChild>
          <Link to={`/d/tickets/${ticket.ticket_no}`}>
            Lihat <Eye />
          </Link>
        </Button>
      );
    },
  },
];
