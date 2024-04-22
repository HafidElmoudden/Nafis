import { Button } from '@/components/ui/button'
import React from 'react'
import InputSection from './input-section'
import Divider from 'components/divider'
import { useForm } from 'react-hook-form'

function StudentSettings() {
    const {
        register,
        handleSubmit,
        watch,
        formState,
      } = useForm()

      const onSubmit = (data) => console.log(data)

    return (
        <section>
            <form onSubmit={handleSubmit(onSubmit)}>

                <div className="flex flex-row-reverse justify-between items-center">
                    <div>
                        <h1 className='text-lg font-semibold'>اعدادات الطالب</h1>
                        <span className='text-sm text-muted-foreground'>.هذا القسم خاص باعدادات الطلاب</span>
                    </div>
                    <div className='space-x-4'>
                        <Button variant="secondary">حذف التغييرات</Button>
                        <Button type='submit'>حفظ</Button>
                    </div>
                </div>
                <Divider />
                <div className='flex flex-col w-full items-end'>
                    <InputSection label='اسم المدرسة' type='text' id='school_name' register={register}/>
                    <Divider />
                    <InputSection label='الادارة التعليمية' type='text' id='educational_administration' register={register}/>
                    <Divider />
                    <InputSection label='مكتب التعليم' type='text' id='educational_office' register={register}/>
                    <Divider />
                    <InputSection label='مدير المدرسة' type='text' id='school_principal' register={register}/>
                    <Divider />
                    <InputSection label='مسؤول نافس' type='text' id='nafis_coordinator' register={register}/>
                    <Divider />
                    <InputSection label='السنة الدراسية' type='text' id='academic_year' register={register}/>
                    <Divider />
                    <InputSection label='الفصل الدراسي' type='text' id='semester' register={register}/>
                    <Divider />
                    <InputSection label='درجة نافس السابقة' type='password' id='previous_nafis_grade' register={register}/>
                    
                </div>
            </form>
        </section>
    )
}

export default StudentSettings