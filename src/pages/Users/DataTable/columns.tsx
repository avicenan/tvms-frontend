"use client";

import { ColumnDef } from "@tanstack/react-table";
import UserDialog from "../user-dialog";
import { InvestigatorType } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { capitalize, cn } from "@/lib/utils";
import { XCircle } from "lucide-react";
import { CheckCircle } from "lucide-react";

export const columns: ColumnDef<InvestigatorType>[] = [
  {
    accessorKey: "nip",
    header: "NIP",
  },
  {
    accessorKey: "name",
    header: "Nama",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Peran",
    cell: ({ row }) => {
      const role = row.original.role;
      return (
        <Badge variant={"outline"} className={cn("rounded-sm px-1 font-normal", role === "admin" ? "bg-blue-400/20 border-blue-400" : "bg-green-400/20 border-green-400")}>
          {capitalize(role)}
        </Badge>
      );
    },
  },
  {
    accessorKey: "is_2fa_enabled",
    header: "2FA",
    cell: ({ row }) => {
      const is2faEnabled = row.original.is_2fa_enabled;
      return (
        <Badge variant={"outline"} className={cn("rounded-sm px-1 font-normal", is2faEnabled ? "bg-green-400/20 border-green-400" : "bg-red-400/20 border-red-400")}>
          {is2faEnabled ? <CheckCircle className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return <UserDialog userId={row.original.id} />;
    },
  },
];
