"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Test } from "./data/testSchema"
import { DataTableColumnHeader } from "./data-table-column-header"
import { getRandomBadgeColor } from "utils"
import TrashIcon from "assets/icons/trash-icon.svg"
// @ts-ignore
import {ReactComponent as FlipBackwardIcon} from "assets/icons/flip-backward-icon.svg"
import PieCharticon from "assets/icons/pie-chart-icon.svg"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { Check, Undo2 } from "lucide-react"
import clsx from "clsx"

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

      return (
        <div className="flex space-x-2">
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
      const status = row.getValue("status") as string;
      return (
        <div className="flex w-[10px] items-center min-w-5">
          <span>
            <Badge key={status} className={clsx(`gap-1`, status === "مرسل" ? "bg-[#ECFDF3]" : "w-[94px] bg-[#F2F4F7]")}>
              {
                status === "مرسل" ? <Check size={16} color="#12B76A" />
                                  : <Undo2 size={16} color="#667085" />
              }
              <span className={clsx(status === "مرسل" ? "text-[#027A48]" : "text-[#344054]")}>{status}</span>
            </Badge>
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
    cell: ({ row }) => <div className="flex items-center justify-center gap-4 min-w-28">
      <Tooltip delayDuration={300}>
        <TooltipTrigger>
          {/* <img src={FlipBackwardIcon} alt="duplicate" className="cursor-pointer" /> */}
          {row.getValue("type") === "قبلي" ? <FlipBackwardIcon color="#475467" className="cursor-pointer"/> : <FlipBackwardIcon color="#D2D6DB" className="cursor-default"/>}
        </TooltipTrigger>
        <TooltipContent className="bg-[#101828]" sideOffset={10}>
          <p>ارسال كاختبار بعدي</p>
        </TooltipContent>
      </Tooltip>
      <Tooltip delayDuration={300}>
        <TooltipTrigger>
          <img src={PieCharticon} alt="statistics" className="cursor-pointer" />
        </TooltipTrigger>
        <TooltipContent className="bg-[#101828]" sideOffset={10}>
          <p>مراجعة احصائيات الاختبار</p>
        </TooltipContent>
      </Tooltip>
      <Tooltip delayDuration={300}>
        <TooltipTrigger>
          <img src={TrashIcon} alt="delete" className="cursor-pointer" />
        </TooltipTrigger>
        <TooltipContent className="bg-[#101828]" sideOffset={10}>
          <p>حذف الاختبار</p>
        </TooltipContent>
      </Tooltip>
    </div>,
  },
]
