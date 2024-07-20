"use client";

import * as React from "react";
import {
    ColumnDef,
    ColumnFiltersState,
    Row,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFacetedRowModel,
    getFacetedUniqueValues,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import { DataTablePagination } from "./data-table-pagination";
import { Question } from "./data/add-skill-page/questionSchema";
import { Button } from "@/components/ui/button";
// @ts-ignore
import { ReactComponent as TrashIcon } from "assets/icons/trash-icon.svg";

export interface QuestionDataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    renderRow?: (row: Row<TData>) => React.ReactNode;
}

export function QuestionDataTable<TData, TValue>({
    columns,
    data,
    renderRow,
}: QuestionDataTableProps<TData, TValue>) {
    const [rowSelection, setRowSelection] = React.useState({});
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({});
    const [columnFilters, setColumnFilters] =
        React.useState<ColumnFiltersState>([]);
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const table = useReactTable({
        data,
        columns,
        state: {
            sorting,
            columnVisibility,
            rowSelection,
            columnFilters,
        },
        enableRowSelection: true,
        enableMultiRowSelection: false,
        onRowSelectionChange: setRowSelection,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        onColumnVisibilityChange: setColumnVisibility,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFacetedRowModel: getFacetedRowModel(),
        getFacetedUniqueValues: getFacetedUniqueValues(),
    });
    console.warn("sseuqdifssdf ", table.getSelectedRowModel().rows[0]);

    return (
        <div className="space-y-4">
            {/* <DataTableToolbar table={table} /> */}
            <div className="rounded-md border overflow-x-auto rtl">
                <div className="inline-block min-w-full align-middle">
                    <Table dir="rtl">
                        <TableHeader
                            className="bg-[#F9FAFB] border-[#EAECF0]"
                            dir="rtl"
                        >
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow
                                    dir="rtl"
                                    key={headerGroup.id}
                                    className="bg-[#FFF7E8]"
                                >
                                    {headerGroup.headers.map((header) => {
                                        return (
                                            <TableHead
                                                dir="rtl"
                                                key={header.id}
                                                colSpan={10}
                                            >
                                                {header.isPlaceholder
                                                    ? null
                                                    : flexRender(
                                                          header.column
                                                              .columnDef.header,
                                                          header.getContext()
                                                      )}
                                            </TableHead>
                                        );
                                    })}
                                </TableRow>
                            ))}
                        </TableHeader>
                        <TableBody dir="rtl">
                            {table.getRowModel().rows?.length ? (
                                table.getRowModel().rows.map((row, idx) => (
                                    <TableRow
                                        dir="rtl"
                                        key={row.id}
                                        className="bg-white"
                                        data-state={
                                            row.getIsSelected() && "selected"
                                        }
                                    >
                                        {
                                            row
                                                .getVisibleCells()
                                                .map((cell) => (
                                                    <TableCell key={cell.id} onClick={() => cell.row.toggleSelected()} className="cursor-pointer">
                                                        {flexRender(
                                                            cell.column
                                                                .columnDef.cell,
                                                            cell.getContext()
                                                        )}
                                                    </TableCell>
                                                ))[0]
                                        }
                                        {idx === 0 &&
                                            table.getSelectedRowModel().rows
                                                .length > 0 && (
                                                <TableCell
                                                    className="space-y-7 w-full bg-[#FFF7E8] align-top"
                                                    rowSpan={
                                                        table.getRowModel().rows
                                                            ?.length
                                                    }
                                                >
                                                    <p className="text-black text-base text-justify">
                                                        {
                                                            (
                                                                table.getSelectedRowModel()
                                                                    .rows[0]
                                                                    .original as Question
                                                            ).question
                                                        }
                                                    </p>

                                                    <img
                                                        src={
                                                            (
                                                                table.getSelectedRowModel()
                                                                    .rows[0]
                                                                    .original as Question
                                                            ).picture
                                                        }
                                                        alt="question"
                                                        className="w-full h-48 object-cover rounded-lg"
                                                    />

                                                    <ul className="pr-5 space-y-3">
                                                        <li className="list-disc">
                                                            {
                                                                (
                                                                    table.getSelectedRowModel()
                                                                        .rows[0]
                                                                        .original as Question
                                                                ).firstChoice
                                                                    .content
                                                            }
                                                            {(
                                                                table.getSelectedRowModel()
                                                                    .rows[0]
                                                                    .original as Question
                                                            ).firstChoice
                                                                .isCorrect ? (
                                                                <span className="text-green-500">
                                                                    {" "}
                                                                    (الخيار
                                                                    الصحيح)
                                                                </span>
                                                            ) : null}
                                                        </li>
                                                        <li className="list-disc">
                                                            {
                                                                (
                                                                    table.getSelectedRowModel()
                                                                        .rows[0]
                                                                        .original as Question
                                                                ).secondChoice
                                                                    .content
                                                            }
                                                            {(
                                                                table.getSelectedRowModel()
                                                                    .rows[0]
                                                                    .original as Question
                                                            ).secondChoice
                                                                .isCorrect ? (
                                                                <span className="text-green-500">
                                                                    {" "}
                                                                    (الخيار
                                                                    الصحيح)
                                                                </span>
                                                            ) : null}
                                                        </li>
                                                        <li className="list-disc">
                                                            {
                                                                (
                                                                    table.getSelectedRowModel()
                                                                        .rows[0]
                                                                        .original as Question
                                                                ).thirdChoice
                                                                    .content
                                                            }
                                                            {(
                                                                table.getSelectedRowModel()
                                                                    .rows[0]
                                                                    .original as Question
                                                            ).thirdChoice
                                                                .isCorrect ? (
                                                                <span className="text-green-500">
                                                                    {" "}
                                                                    (الخيار
                                                                    الصحيح)
                                                                </span>
                                                            ) : null}
                                                        </li>
                                                        <li className="list-disc">
                                                            {
                                                                (
                                                                    table.getSelectedRowModel()
                                                                        .rows[0]
                                                                        .original as Question
                                                                ).fourthChoice
                                                                    .content
                                                            }
                                                            {(
                                                                table.getSelectedRowModel()
                                                                    .rows[0]
                                                                    .original as Question
                                                            ).fourthChoice
                                                                .isCorrect ? (
                                                                <span className="text-green-500">
                                                                    {" "}
                                                                    (الخيار
                                                                    الصحيح)
                                                                </span>
                                                            ) : null}
                                                        </li>
                                                    </ul>
                                                    <div className="flex gap-3 justify-end">
                                                        <Button
                                                            variant={"outline"}
                                                        >
                                                            تعديل
                                                        </Button>
                                                        <Button
                                                            variant={
                                                                "destructive"
                                                            }
                                                            className="gap-1.5"
                                                        >
                                                            <TrashIcon color="white" />
                                                            حذف
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            )}
                                        {idx === 0 &&
                                            table.getSelectedRowModel().rows
                                                .length === 0 && (
                                                <TableCell
                                                    className="space-y-7 w-full bg-[#FFF7E8]"
                                                    rowSpan={
                                                        table.getRowModel().rows
                                                            ?.length
                                                    }
                                                >
                                                    <p className="text-center">
                                                        اضغط على أحد الأسئلة
                                                        لعرض التفاصيل.
                                                    </p>
                                                </TableCell>
                                            )}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow dir="rtl">
                                    <TableCell
                                        dir="rtl"
                                        colSpan={columns.length}
                                        className="h-24 text-center"
                                    >
                                        .القائمة فارغة
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>
            <DataTablePagination table={table} />
        </div>
    );
}
