import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Table } from "@tanstack/react-table";

interface PaginationMeta {
  current_page: number;
  from: number;
  last_page: number;
  per_page: number;
  to: number;
  total: number;
}

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
  meta: PaginationMeta | null;
}

export default function DataTablePagination<TData>({ table, meta }: DataTablePaginationProps<TData>) {
  return (
    <div className="flex items-center justify-between space-x-2 py-4">
      <div className="flex-1 text-sm text-muted-foreground">
        {meta && (
          <>
            Menampilkan {meta.from} sampai {meta.to} dari {meta.total} data
            <br />
            Halaman {meta.current_page} dari {meta.last_page}
          </>
        )}
      </div>
      <div className="flex items-center space-x-2">
        <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
