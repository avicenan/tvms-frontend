"use client";

import { columns } from "./DataTable/columns";
import { DataTable } from "./DataTable/data-table";
import { Users } from "lucide-react";
import NewUserDialog from "./new-user-dialog";
// Dummy data for testing
// const dummyData: any[] = [
//   {
//     id: "1",
//     nip: "198501012010011001",
//     name: "AKP Budi Santoso",
//     status: "Aktif",
//     last_login: "2024-03-20T10:30:00Z",
//     created_at: "2024-01-01T00:00:00Z",
//   },
//   {
//     id: "2",
//     nip: "198602022010011002",
//     name: "IPDA Siti Rahayu",
//     status: "Aktif",
//     last_login: "2024-03-19T15:45:00Z",
//     created_at: "2024-01-02T00:00:00Z",
//   },
//   {
//     id: "3",
//     nip: "198703032010011003",
//     name: "IP Rudi Hartono",
//     status: "Nonaktif",
//     last_login: "2024-03-15T09:20:00Z",
//     created_at: "2024-01-03T00:00:00Z",
//   },
//   {
//     id: "4",
//     nip: "198804042010011004",
//     name: "BRIPKA Ahmad Hidayat",
//     status: "Aktif",
//     last_login: "2024-03-20T08:15:00Z",
//     created_at: "2024-01-04T00:00:00Z",
//   },
//   {
//     id: "5",
//     nip: "198905052010011005",
//     name: "BRIGPOL Dian Kusuma",
//     status: "Aktif",
//     last_login: "2024-03-18T14:30:00Z",
//     created_at: "2024-01-05T00:00:00Z",
//   },
// ];

export default function UsersPage() {
  return (
    <div className="container pb-4">
      <div className="flex items-start justify-between">
        <h1 className="text-lg font-bold mb-4 flex gap-2 items-center">
          <Users /> Manajemen Akun
        </h1>
        <NewUserDialog />
      </div>
      <DataTable columns={columns} />
    </div>
  );
}
