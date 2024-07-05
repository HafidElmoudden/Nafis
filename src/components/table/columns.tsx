"use client"

import { ColumnDef } from "@tanstack/react-table"

import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"

import { labels, priorities, statuses } from "./data/data"
import { Test } from "./data/testSchema"
import { DataTableColumnHeader } from "./data-table-column-header"
import { DataTableRowActions } from "./data-table-row-actions"
import { getRandomBadgeColor } from "utils"
import TrashIcon from "assets/icons/trash-icon.svg"
import FlipBackwardIcon from "assets/icons/flip-backward-icon.svg"
import PieCharticon from "assets/icons/pie-chart-icon.svg"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

export const columns: ColumnDef<Test>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className=" border-[#D0D5DD]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-x-[-13px] border-[#D0D5DD]"
      />
    ),
  },
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="اختبارات" />
    ),
    cell: ({ row }) => <div className="w-[80px] font-semibold font-inter">{row.getValue("id")}</div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "subject",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="المادة" />
    ),
    cell: ({ row }) => {
      const label = labels.find((label) => label.value === row.original.subject)

      return (
        <div className="flex space-x-2">
          {label && <Badge variant="outline">{label.label}</Badge>}
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("subject")}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "class",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="الصف" />
    ),
    cell: ({ row }) => {

      return (
        <div className="flex w-[100px] items-center">
          <span>
            {row.getValue("class")}
          </span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: "skills",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="المهارات" />
    ),
    cell: ({ row }) => {
      const skills = row.getValue("skills") as string[]
      return (
        <div className="flex items-center">
          {skills.map((skill) => (
            <Badge key={skill} className={`mr-1  ${getRandomBadgeColor()}`}>
              {skill}
            </Badge>
          ))}
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: "type",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="الصنف" />
    ),
    cell: ({ row }) => {

      return (
        <div className="flex w-[10px] items-center">
          <span>
            {row.getValue("type")}
          </span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="الحالة" />
    ),
    cell: ({ row }) => {

      return (
        <div className="flex w-[10px] items-center">
          <span>
            {row.getValue("status")}
          </span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <div className="flex items-center justify-center gap-4">
      <Tooltip delayDuration={300}>
        <TooltipTrigger>
          <img src={FlipBackwardIcon} alt="duplicate" className="cursor-pointer" />
        </TooltipTrigger>
        <TooltipContent sideOffset={10}>
          <p>ارسال كاختبار بعدي</p>
        </TooltipContent>
      </Tooltip>
      <Tooltip delayDuration={300}>
        <TooltipTrigger>
          <img src={PieCharticon} alt="statistics" className="cursor-pointer" />
        </TooltipTrigger>
        <TooltipContent sideOffset={10}>
          <p>مراجعة احصائيات الاختبار</p>
        </TooltipContent>
      </Tooltip>
      <Tooltip delayDuration={300}>
        <TooltipTrigger>
          <img src={TrashIcon} alt="delete" className="cursor-pointer" />
        </TooltipTrigger>
        <TooltipContent sideOffset={10}>
          <p>حذف الاختبار</p>
        </TooltipContent>
      </Tooltip>
    </div>,
  },
]
