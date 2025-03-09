"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { SquareArrowOutUpRight } from "lucide-react";
import { Link } from "react-router-dom";

export type Violation = {
  id: number;
  unique_id: string;
  vehicle_no: string;
  type: string;
  datetime: string;
  location: string;
  status: "tilang" | "terdeteksi" | "batal";
  ticket_no?: string | null;
};

export const columns: ColumnDef<Violation>[] = [
  {
    accessorKey: "unique_id",
    header: "ID",
  },
  {
    accessorKey: "vehicle_no",
    header: "No. Kendaraan",
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
    accessorKey: "location",
    header: "Lokasi",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    id: "aksi",
    cell: ({ row }) => {
      const violation = row.original;
      switch (violation.status) {
        case "terdeteksi":
          return (
            <div className="flex gap-2">
              <Button variant={"ghost"} asChild>
                <Link to={`/d/violations/${violation.unique_id}`}>Proses</Link>
              </Button>
            </div>
          );
        case "tilang":
          return (
            <div className="flex gap-2">
              <Button variant={"ghost"} asChild>
                <Link to={`/d/tickets/${violation.ticket_no}`}>
                  Surat Tilang <SquareArrowOutUpRight />
                </Link>
              </Button>
            </div>
          );
        case "batal":
          return (
            <div className="flex gap-2">
              <Link to={`/d/violations/${violation.unique_id}`}>
                <h1>batal</h1>
              </Link>
            </div>
          );
      }
    },
  },
];
