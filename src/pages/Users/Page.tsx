"use client";

import { useEffect, useState } from "react";
import { columns, PoliceOfficer } from "./DataTable/columns";
import { DataTable } from "./DataTable/data-table";
import { Loader, Users } from "lucide-react";

// Dummy data for testing
const dummyData: PoliceOfficer[] = [
  {
    id: "1",
    nip: "198501012010011001",
    name: "AKP Budi Santoso",
    status: "Aktif",
    last_login: "2024-03-20T10:30:00Z",
    created_at: "2024-01-01T00:00:00Z",
  },
  {
    id: "2",
    nip: "198602022010011002",
    name: "IPDA Siti Rahayu",
    status: "Aktif",
    last_login: "2024-03-19T15:45:00Z",
    created_at: "2024-01-02T00:00:00Z",
  },
  {
    id: "3",
    nip: "198703032010011003",
    name: "IP Rudi Hartono",
    status: "Nonaktif",
    last_login: "2024-03-15T09:20:00Z",
    created_at: "2024-01-03T00:00:00Z",
  },
  {
    id: "4",
    nip: "198804042010011004",
    name: "BRIPKA Ahmad Hidayat",
    status: "Aktif",
    last_login: "2024-03-20T08:15:00Z",
    created_at: "2024-01-04T00:00:00Z",
  },
  {
    id: "5",
    nip: "198905052010011005",
    name: "BRIGPOL Dian Kusuma",
    status: "Aktif",
    last_login: "2024-03-18T14:30:00Z",
    created_at: "2024-01-05T00:00:00Z",
  },
];

export default function UsersPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [officers, setOfficers] = useState<PoliceOfficer[]>([]);

  useEffect(() => {
    // Simulate API call
    const fetchData = async () => {
      try {
        // In a real app, this would be an API call
        // const response = await userApi.getOfficers();
        // setOfficers(response.data.data);

        // Using dummy data for now
        setOfficers(dummyData);
      } catch (error) {
        console.error("Error fetching officers:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-4rem)] gap-2">
        <Loader className="h-8 w-8 animate-spin" /> <p className="text-sm">Memuat Data...</p>
      </div>
    );
  }

  return (
    <div className="container pb-4">
      <h2 className="text-lg font-bold mb-4 flex gap-2 items-center">
        <Users /> Manajemen Akun Polisi
      </h2>
      <DataTable columns={columns} data={officers} />
    </div>
  );
}
