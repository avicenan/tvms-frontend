"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ColumnDef } from "@tanstack/react-table";
import { ScanSearch, Ticket } from "lucide-react";
import { Link } from "react-router-dom";

export type Violation = {
  id: string;
  number: string;
  violation_type: string;
  created_at: string;
  evidence: string;
  location: string;
  status: "Tilang" | "Terdeteksi" | "Batal";
  ticket_id?: string;
};

export const columns: ColumnDef<Violation>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => {
      return <div className="max-w-20 truncate">{row.original.id}</div>;
    },
  },
  {
    accessorKey: "number",
    header: "No. Kendaraan",
    cell: ({ row }) => {
      return (
        <HoverCard
          onOpenChange={() => {
            console.log("fetch to server", row.original);
          }}
        >
          <HoverCardTrigger className=" cursor-default">
            <Badge variant={"outline"} className="rounded-none border-0 outline-1 outline-dark font-mono font-bold text-md">
              {row.original.number}
            </Badge>
          </HoverCardTrigger>
          <HoverCardContent className="flex justify-center">
            <img src={`https://api.etilang.web.id/storage/${row.original.evidence}`} alt={row.original.evidence} />
          </HoverCardContent>
        </HoverCard>
      );
    },
  },
  {
    accessorKey: "violation_type.name",
    header: "Pelanggaran",
    cell: ({ row }) => {
      const type = row.original.violation_type;
      return <span className="">{type}</span>;
    },
  },
  {
    accessorKey: "created_at",
    header: "Waktu",
    cell: ({ row }) => {
      const createdAt = row.original.created_at;
      const formattedDate = new Date(createdAt).toLocaleString("id-ID", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
      return <span className="">{formattedDate}</span>;
    },
  },
  {
    accessorKey: "camera.location",
    header: "Lokasi",
    cell: ({ row }) => {
      const location = row.original.location;
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <div className="max-w-40 truncate">{location}</div>
            </TooltipTrigger>
            <TooltipContent>
              <p>{location}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      const colorTheme = () => {
        switch (status.toLowerCase()) {
          case "tilang":
            return "bg-blue-400/20 border-blue-400";
          case "terdeteksi":
            return "bg-yellow-400/20 border-yellow-400";
          case "batal":
            return "bg-red-400/20 border-red-400";
        }
      };
      return (
        <div className="flex flex-col gap-2">
          <Badge variant={"outline"} className={`${colorTheme()}`}>
            <span className={`w-2 h-2 me-1 text-xs font-semibold rounded-full bg-zinc-400`} />
            {status}
          </Badge>
          {/* <span className="text-xs text-zinc-500">01/03/2023 13:30 </span> */}
        </div>
      );
    },
  },
  {
    id: "aksi",
    cell: ({ row }) => {
      const violation = row.original;
      switch (violation.status.toLowerCase()) {
        case "terdeteksi":
          return (
            <Button asChild>
              <Link to={`/d/violations/${violation.id}`}>
                <ScanSearch /> Proses
              </Link>
            </Button>
          );
        case "tilang":
          return (
            <Button variant={"outline"} asChild>
              <Link to={`/d/tickets/${violation.ticket_id}`}>
                <Ticket /> Surat Tilang
              </Link>
            </Button>
          );
        case "batal":
          return (
            <Button variant={"secondary"} disabled>
              <ScanSearch /> Proses
            </Button>
          );
      }
    },
  },
];
