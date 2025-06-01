"use client";

import { ColumnDef, ColumnFiltersState, flexRender, getCoreRowModel, getFacetedRowModel, getFacetedUniqueValues, getFilteredRowModel, getPaginationRowModel, useReactTable } from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useEffect, useState } from "react";
import DataTablePagination from "./data-table-pagination";
// import DataTableToolBar from "./data-table-toolbar";
import { CardHeader } from "@/components/ui/card";
import { Card } from "@/components/ui/card";
import { CardContent } from "@/components/ui/card";
import { ticketApi } from "@/lib/api";
import { useSearchParams } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";

interface PaginationMeta {
  current_page: number;
  from: number;
  last_page: number;
  per_page: number;
  to: number;
  total: number;
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
}

export function DataTable<TData, TValue>({ columns }: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [data, setData] = useState<TData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [meta, setMeta] = useState<PaginationMeta | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const fetchData = async (pageNumber: number) => {
    try {
      const response = await ticketApi.getTickets(pageNumber);
      setData(response.data.data);
      setMeta(response.data.meta);
      setSearchParams((prev) => ({
        ...Object.fromEntries(prev),
        page: pageNumber.toString(),
      }));
    } catch (error) {
      console.error("Error fetching tickets:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const pageParam = searchParams.get("page");
    setIsLoading(true);
    if (pageParam) {
      setPage(parseInt(pageParam));
      fetchData(parseInt(pageParam));
    } else {
      fetchData(1);
    }
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchData(page);
    }, 10000);

    return () => clearInterval(intervalId);
  }, [page]);

  const handlePageChange = (newPage: number) => {
    setIsLoading(true);
    setPage(newPage);
    fetchData(newPage);
  };

  const table = useReactTable({
    data,
    columns,
    state: {
      columnFilters,
      pagination: {
        pageIndex: page - 1,
        pageSize: meta?.per_page || 10,
      },
    },
    pageCount: meta?.last_page || 1,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    onPaginationChange: (updater) => {
      if (typeof updater === "function") {
        const newState = updater({
          pageIndex: page - 1,
          pageSize: meta?.per_page || 10,
        });
        handlePageChange(newState.pageIndex + 1);
      }
    },
    manualPagination: true,
  });

  return (
    <Card className="gap-0">
      <CardHeader>{/* <DataTableToolBar table={table} /> */}</CardHeader>
      <CardContent className="mb-0">
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-10 text-center">
                    <Skeleton className="h-5 w-full" />
                  </TableCell>
                </TableRow>
              ) : (
                table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return <TableHead key={header.id}>{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}</TableHead>;
                    })}
                  </TableRow>
                ))
              )}
            </TableHeader>
            <TableBody>
              {isLoading ? (
                Array.from({ length: meta?.per_page || 10 }).map((_, index) => (
                  <TableRow key={index}>
                    {columns.map((_, cellIndex) => (
                      <TableCell key={cellIndex} className="py-4">
                        <Skeleton className="h-5 w-full" />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    Tidak ada hasil.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <DataTablePagination table={table} meta={meta} />
      </CardContent>
    </Card>
  );
}
