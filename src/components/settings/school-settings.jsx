import { Button } from '@/components/ui/button'
import React from 'react'

function SchoolSettings() {
    return (
        <section>
            <div className="flex flex-row-reverse justify-between items-center">
                <div>
                    <h1 className='text-lg font-semibold'>اعدادات المدرسة</h1>
                    <span className='text-sm text-muted-foreground'>.في هذا القسم يمكنك تعديل المعلومات الخاصة بالمدرسة</span>
                </div>
                <div className='space-x-4'>
                    <Button variant="secondary">حذف التغييرات</Button>
                    <Button>حفظ</Button>
                </div>
            </div>
        </section>
    )
}

export default SchoolSettings