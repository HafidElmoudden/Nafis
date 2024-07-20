"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Skill } from "../../data/skills-page/skillSchema";
import { DataTableColumnHeader } from "../../data-table-column-header";
import TrashIcon from "assets/icons/trash-icon.svg";
// @ts-ignore
import { ReactComponent as FlipBackwardIcon } from "assets/icons/flip-backward-icon.svg";
import PieCharticon from "assets/icons/pie-chart-icon.svg";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
// @ts-ignore
import { ReactComponent as PenIcon } from "assets/icons/pen-icon.svg";

export const columns: ColumnDef<Skill>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <div className="flex justify-center items-center mr-3">
                <Checkbox
                    checked={
                        table.getIsAllPageRowsSelected() ||
                        (table.getIsSomePageRowsSelected() && "indeterminate")
                    }
                    onCheckedChange={(value) =>
                        table.toggleAllPageRowsSelected(!!value)
                    }
                    aria-label="Select all"
                    className="border-[#D0D5DD]"
                />
            </div>
        ),
        cell: ({ row }) => (
            <div className="flex justify-center items-center mr-3">
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label="Select row"
                    className="border-[#D0D5DD]"
                />
            </div>
        ),
    },
    {
        accessorKey: "name",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="المهارة" />
        ),
        cell: ({ row }) => (
            <div className="font-semibold">{row.getValue("name")}</div>
        ),
        enableSorting: false
    },
    {
        accessorKey: "subject",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="المادة" />
        ),
        cell: ({ row }) => {
            return (
                <div className="flex space-x-2">
                    <span className="max-w-[500px] truncate font-medium text-[#475467]">
                        {row.getValue("subject")}
                    </span>
                </div>
            );
        },
        enableSorting: false
    },
    {
        accessorKey: "classes",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="الصفوف" />
        ),
        cell: ({ row }) => {
            const skills = row.getValue("classes") as string[];
            return (
                <div className="flex items-center">
                    {skills.map((skill) => (
                        <Badge
                            key={skill}
                            className={`mr-1 bg-yellow-50 text-yellow-700`}
                        >
                            {skill}
                        </Badge>
                    ))}
                </div>
            );
        },
        enableSorting: false
        // filterFn: (row, id, value) => {
        //     return value.includes(row.getValue(id));
        // },
    },
    {
        accessorKey: "numberOfQuestions",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="عدد الاسئلة" />
        ),
        cell: ({ row }) => {
            return (
                <div className="flex items-center">
                    <span className="font-inter text-[#475467]">
                        {row.getValue("numberOfQuestions")}
                    </span>
                </div>
            );
        },
        enableSorting: false
    },
    {
        accessorKey: "numberOfTests",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="عدد الاختبارات" />
        ),
        cell: ({ row }) => {
            return (
                <div className="flex items-center">
                    <span className="font-inter text-[#475467]">
                        {row.getValue("numberOfTests")}
                    </span>
                </div>
            );
        },
        enableSorting: false
    },
    {
        id: "actions",
        cell: ({ row }) => (
            <div className="flex items-center justify-center gap-4 min-w-14">
                <Tooltip delayDuration={300}>
                    <TooltipTrigger>
                        <PenIcon color="#475467" className="cursor-pointer" />
                    </TooltipTrigger>
                    <TooltipContent className="bg-[#101828]" sideOffset={10}>
                        <p>تعديل المهارة</p>
                    </TooltipContent>
                </Tooltip>
                <Tooltip delayDuration={300}>
                    <TooltipTrigger>
                        <img
                            src={TrashIcon}
                            alt="delete"
                            className="cursor-pointer"
                        />
                    </TooltipTrigger>
                    <TooltipContent className="bg-[#101828]" sideOffset={10}>
                        <p>حذف المهارة</p>
                    </TooltipContent>
                </Tooltip>
            </div>
        ),
    },
];
