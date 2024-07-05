import { Breadcrumb, BreadcrumbItem } from 'components/breadcrumb'
import tasks from 'components/table/data/tests-data-placeholder'
import React from 'react'
import HomeIcon from 'assets/icons/navbar/home-icon'
import FilePlusIcon from 'assets/icons/file-plus-icon.svg'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from '@/components/ui/button'
import { columns } from 'components/table/columns'
import { DataTable } from 'components/table/data-table'
import { testSchema } from 'components/table/data/testSchema'
function TestsPage() {
  return (
    <div className='w-full h-full flex flex-col p-8 gap-8 min-h-[300px]'>
      <header className='flex flex-col gap-[10px] w-full'>
        <Breadcrumb>
          <BreadcrumbItem title={"الرئيسية"} icon={HomeIcon} />
          <BreadcrumbItem title={"الاختبارات"} />
        </Breadcrumb>

        <div className='flex flex-row-reverse w-full h-[93px] justify-between'>
          <div className='flex flex-col justify-center'>
            <p className='text-lg font-bold text-[#101828]'>الاختبارات</p>
            <p className='text-[#475467]'>يمكنك اختيار النموذج الذي يناسبك او تحميل نموذجك الخاص مع احترام <u>شروط تحميل نمودج جديد</u></p>
          </div>
          <Button variant={"default"} className='w-[130px]'>
            <img src={FilePlusIcon} alt="file-plus-icon" className='pr-2' />
            انشاء اختبار
          </Button>
        </div>
        <div className='bg-[#EAECF0] w-full h-px' />
      </header>

      <DataTable data={tasks} columns={columns} />
    </div >
  )
}

export default TestsPage