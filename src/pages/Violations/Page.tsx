import { useEffect, useState } from "react";
import { columns, Violation } from "./DataTable/columns";
import { DataTable } from "./DataTable/data-table";
import { Loader, TrafficCone } from "lucide-react";
import { violationApi } from "@/lib/api";
// async function getData(): Promise<Violation[]> {
//   // Fetch data from your API here.
//   await new Promise((resolve) => setTimeout(resolve, 1000));
//   return [
//     {
//       id: 1,
//       unique_id: "212xer",
//       vehicle_no: "B2938KKK",
//       type: "Helm",
//       datetime: "01/01/2023 10:00:00 PM",
//       location: "Jl. Telekomunikasi Satu Dua, Jakarta",
//       status: "Terdeteksi",
//     },
//     {
//       id: 1,
//       unique_id: "212xer",
//       vehicle_no: "B2938KKK",
//       type: "Helm",
//       datetime: "01/01/2023 10:00:00 PM",
//       location: "Jl. Telekomunikasi, Kota Bandung",
//       status: "Terdeteksi",
//     },
//     {
//       id: 1,
//       unique_id: "212xer",
//       vehicle_no: "B2938KKK",
//       type: "Helm",
//       datetime: "01/01/2023 10:00:00 PM",
//       location: "Jl. Telekomunikasi, Jakarta",
//       status: "Terdeteksi",
//     },
//     {
//       id: 2,
//       unique_id: "212xer",
//       vehicle_no: "B7765KOK",
//       type: "Helm",
//       datetime: "01/01/2023 10:00:00 PM",
//       location: "Jl. Telekomunikasi, Jakarta",
//       status: "Tilang",
//     },
//     {
//       id: 2,
//       unique_id: "212xer",
//       vehicle_no: "B7765KOK",
//       type: "Helm",
//       datetime: "01/01/2023 10:00:00 PM",
//       location: "Jl. Telekomunikasi, Jakarta",
//       status: "Tilang",
//     },
//     {
//       id: 2,
//       unique_id: "212xer",
//       vehicle_no: "B7765KOK",
//       type: "Helm",
//       datetime: "01/01/2023 10:00:00 PM",
//       location: "Jl. Telekomunikasi, Jakarta",
//       status: "Batal",
//     },
//     {
//       id: 2,
//       unique_id: "212xer",
//       vehicle_no: "B7765KOK",
//       type: "Helm",
//       datetime: "01/01/2023 10:00:00 PM",
//       location: "Jl. Telekomunikasi, Jakarta",
//       status: "Batal",
//     },
//     {
//       id: 2,
//       unique_id: "212xer",
//       vehicle_no: "B7765KOK",
//       type: "Helm",
//       datetime: "01/01/2023 10:00:00 PM",
//       location: "Jl. Telekomunikasi, Jakarta",
//       status: "Batal",
//     },
//     {
//       id: 2,
//       unique_id: "212xer",
//       vehicle_no: "B7765KOK",
//       type: "Helm",
//       datetime: "01/01/2023 10:00:00 PM",
//       location: "Jl. Telekomunikasi, Jakarta",
//       status: "Batal",
//     },
//     {
//       id: 2,
//       unique_id: "212xer",
//       vehicle_no: "B7765KOK",
//       type: "Helm",
//       datetime: "01/01/2023 10:00:00 PM",
//       location: "Jl. Telekomunikasi, Jakarta",
//       status: "Batal",
//     },
//     {
//       id: 2,
//       unique_id: "212xer",
//       vehicle_no: "B7765KOK",
//       type: "Helm",
//       datetime: "01/01/2023 10:00:00 PM",
//       location: "Jl. Telekomunikasi, Jakarta",
//       status: "Batal",
//     },
//   ];
// }

export default function ViolationsPage() {
  const [violations, setViolations] = useState<Violation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAndSetViolations = async (isInitialFetch: boolean) => {
      console.log("fetching violations");
      try {
        const response = await violationApi.getViolations();
        const newData = response.data.data as Violation[];

        setViolations((currentViolations) => {
          if (JSON.stringify(currentViolations) !== JSON.stringify(newData)) {
            return newData;
          }
          return currentViolations;
        });
      } catch (error) {
        console.error("Error fetching violations:", error);
      } finally {
        if (isInitialFetch) {
          setLoading(false);
        }
      }
    };

    fetchAndSetViolations(true);

    const intervalId = setInterval(() => {
      fetchAndSetViolations(false);
    }, 10000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-4rem)] gap-2">
        <Loader className="h-8 w-8 animate-spin" /> <p className="text-sm">Memuat Data...</p>
      </div>
    );
  }

  return (
    <div className="">
      <h1 className="flex items-center gap-2 text-lg font-bold mb-4">
        <TrafficCone /> Pelanggaran Terdeteksi
      </h1>
      {/* <Button variant={"outline"} className="absolute right-10">
        <RefreshCw />
      </Button> */}
      <DataTable columns={columns} data={violations} />
    </div>
  );
}
