"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { Eye, UserCog } from "lucide-react";
import { Link } from "react-router-dom";

export type PoliceOfficer = {
  id: string;
  nip: string;
  name: string;
  status: "Aktif" | "Nonaktif";
  last_login: string;
  created_at: string;
};

export const columns: ColumnDef<PoliceOfficer>[] = [
  {
    accessorKey: "nip",
    header: "NIP",
  },
  {
    accessorKey: "name",
    header: "Nama",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      const colorTheme = () => {
        switch (status.toLowerCase()) {
          case "aktif":
            return "bg-green-400/20 border-green-400";
          case "nonaktif":
            return "bg-red-400/20 border-red-400";
          default:
            return "bg-zinc-400/20 border-zinc-400";
        }
      };
      return (
        <Badge variant={"outline"} className={`${colorTheme()}`}>
          <span className={`w-2 h-2 me-1 text-xs font-semibold rounded-full bg-zinc-400`} />
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "last_login",
    header: "Login Terakhir",
    cell: ({ row }) => {
      const lastLogin = row.original.last_login;
      const formattedDate = new Date(lastLogin).toLocaleString("id-ID", {
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
    id: "actions",
    cell: ({ row }) => {
      const officer = row.original;
      return (
        <div className="flex gap-2">
          <Button variant={"outline"} size="sm" asChild>
            <Link to={`/d/users/${officer.id}`}>
              <Eye className="h-4 w-4 mr-1" /> Detail
            </Link>
          </Button>
          <Button variant={"outline"} size="sm" asChild>
            <Link to={`/d/users/${officer.id}/edit`}>
              <UserCog className="h-4 w-4 mr-1" /> Edit
            </Link>
          </Button>
        </div>
      );
    },
  },
];
