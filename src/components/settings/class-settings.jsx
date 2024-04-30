import { Button } from '@/components/ui/button'
import Divider from 'components/divider';
import React from 'react'
import InputSection from './input-section';
import { Code, KeyRound, Mail, Phone, SchoolIcon, UserIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';

function ClassSettings() {
    const {
        register,
        handleSubmit,
        watch,
        formState,
    } = useForm()

    const onSubmit = (data) => console.log(data)

    return (
        <section className='overflow-y-visible max-h-full'>
            <form onSubmit={handleSubmit(onSubmit)}>

                <div className="flex flex-row-reverse  justify-between items-center">
                    <div>
                        <h1 className='text-lg font-semibold'>اعدادات الفصول</h1>
                        <span className='text-sm text-muted-foreground'>.في هذا القسم يمكنك تعديل المعلومات العامة الخاصة بالحساب</span>
                    </div>
                    <div className='space-x-4'>
                        <Button variant="secondary">حذف التغييرات</Button>
                        <Button>حفظ</Button>
                    </div>
                </div>
                <Divider />
                <div className='flex flex-col w-full items-end'>
                    <InputSection label='الصف الثالث' type='text' id='third_class' icon={<SchoolIcon size={20} className='text-center' />} register={register} />
                    <Divider />
                    <InputSection label='الصف السادس' type='text' id='sixth_class' icon={<SchoolIcon size={20} className='text-center' />} register={register} />
                    <Divider />
                    <InputSection label='الصف الثالث المتوسط' type='text' id='third_mid_class' icon={<SchoolIcon size={20} className='text-center' />} register={register} />
                </div>
            </form>
        </section>
    )
}

export default ClassSettings;