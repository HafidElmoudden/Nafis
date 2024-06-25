import { Button } from '@/components/ui/button'
import React from 'react'
import InputSection from '../input-section'
import Divider from 'components/divider'
import { useForm } from 'react-hook-form'
import DropdownSection from 'components/dropdown-section'
import { School } from 'lucide-react'
import FileChooserSection from 'components/fileupload-section'
import { useSchool } from 'hooks/useSchool'
import { useSchoolClasses } from 'hooks/useSchoolClasses'

function StudentSettings() {
    const {
        register,
        handleSubmit,
        watch,
        formState,
    } = useForm()

    const onSubmit = (data) => console.log(data)
    const { school, loading, error } = useSchool();

    const schoolClasses = useSchoolClasses(school?.school_code);
    const classOptions = schoolClasses?.schoolClasses.map((item) => {
        return {
            value: item.id,
            label: item.class_label
        }
    })
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
                    <DropdownSection label='الصف' id='class' comboBoxData={classOptions} register={register} icon={<School size={20} className='text-center' />} />
                    <Divider />
                    <FileChooserSection label='ملف بيانات الطلاب' subLabel="يجب أن تكون أعمدة الملف بهذا الترتيب: اسم، رقم الهاتف، ايميل" supportedFormats={["XLS", "XLSX", "CSV"]} id='student_image' showUploadedFiles register={register} />
                </div>
            </form>
        </section>
    )
}

export default StudentSettings