import { useEffect, useState } from "react";
import { columns, Violation } from "./DataTable/columns";
import { DataTable } from "./DataTable/data-table";

async function getData(): Promise<Violation[]> {
  // Fetch data from your API here.
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return [
    {
      id: 1,
      unique_id: "212xer",
      vehicle_no: "B2938KKK",
      type: "Helm",
      datetime: "2023-01-01 10:00:00",
      location: "Jl. Telekomunikasi, Jakarta",
      status: "terdeteksi",
    },
    {
      id: 2,
      unique_id: "212xer",
      vehicle_no: "B7765KOK",
      type: "Helm",
      datetime: "2023-01-01 10:00:00",
      location: "Jl. Telekomunikasi, Jakarta",
      status: "tilang",
    },
  ];
}

export default function Violations() {
  const [data, setData] = useState<Violation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getData();
      setData(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-[1000px] mx-[24px] w-full">
      <div className="">
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
}
