"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "../../data-table-column-header";
import { Question } from "components/table/data/add-skill-page/questionSchema";

export const questionsTableColumns: ColumnDef<Question>[] = [
    {
        accessorKey: "question",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="الأسئلة" />
        ),
        cell: ({ row }) => (
            <div
                className="w-[450px]"
                onClick={() => row.toggleSelected()}
            >
                <p className="font-semibold truncate">{row.getValue("question")}</p>
            </div>
        ),
        enableSorting: false,
    },
];
