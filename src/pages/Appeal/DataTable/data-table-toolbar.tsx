import { Table } from "@tanstack/react-table";
import { Input } from "../../../components/ui/input";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { statuses } from "./filterData";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export default function DataTableToolBar<TData>({ table }: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  const navigate = useNavigate();

  const handleResetFilters = () => {
    navigate("");
    table.resetColumnFilters();
  };
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Cari no kendaraan..."
          value={(table.getColumn("number")?.getFilterValue() as string) ?? ""}
          onChange={(event) => table.getColumn("number")?.setFilterValue(event.target.value)}
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn("status") && <DataTableFacetedFilter column={table.getColumn("status")} title="Status" options={statuses} />}
        {isFiltered && (
          <Button variant="ghost" onClick={handleResetFilters} className="h-8 px-2 lg:px-3">
            Reset
            <X />
          </Button>
        )}
      </div>
    </div>
  );
}
