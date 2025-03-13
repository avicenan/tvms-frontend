"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ColumnDef } from "@tanstack/react-table";
import { ScanSearch, Ticket } from "lucide-react";
import { Link } from "react-router-dom";

export type Violation = {
  id: number;
  unique_id: string;
  vehicle_no: string;
  type: string;
  datetime: string;
  location: string;
  status: "Tilang" | "Terdeteksi" | "Batal";
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
    cell: ({ row }) => {
      const handleHover = () => {
        console.log("fetch to server");
      };
      return (
        <HoverCard onOpenChange={handleHover}>
          <HoverCardTrigger className=" cursor-default">
            <Badge variant={"outline"} className="rounded-none border-0 outline-1 outline-dark font-mono font-bold text-md">
              {row.original.vehicle_no}
            </Badge>
          </HoverCardTrigger>
          <HoverCardContent className="w-80">
            <div className="flex justify-between space-x-4">
              <img src="https://placehold.co/600x400" alt="" />
            </div>
          </HoverCardContent>
        </HoverCard>
      );
    },
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
              <Link to={`/d/violations/${violation.unique_id}`}>
                <ScanSearch /> Proses
              </Link>
            </Button>
          );
        case "tilang":
          return (
            <Button variant={"outline"} asChild>
              <Link to={`/d/tickets/${violation.unique_id}`}>
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
