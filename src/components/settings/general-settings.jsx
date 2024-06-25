import { Button } from '@/components/ui/button'
import Divider from 'components/divider';
import React from 'react'
import InputSection from '../input-section';
import { Code, KeyRound, Mail, Phone, UserIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import useSession from 'hooks/useSession';
import useUser from 'hooks/useUser';

function GeneralSettings() {
    const {
        register,
        handleSubmit,
        watch,
        formState,
    } = useForm()

    const onSubmit = (data) => console.log(data)

    const user = useUser();
    return (
        <section className='overflow-y-visible max-h-full'>
            <form onSubmit={handleSubmit(onSubmit)}>

                <div className="flex flex-row-reverse  justify-between items-center">
                    <div>
                        <h1 className='text-lg font-semibold'>اعدادات عامة</h1>
                        <span className='text-sm text-muted-foreground'>.في هذا القسم يمكنك تعديل المعلومات العامة الخاصة بالحساب</span>
                    </div>
                    <div className='space-x-4'>
                        <Button variant="secondary">حذف التغييرات</Button>
                        <Button>حفظ</Button>
                    </div>
                </div>
                <Divider />
                <div className='flex flex-col w-full items-end'>
                    <InputSection label='الاسم الكامل' type='text' id='full_name' value={user?.user_metadata?.full_name} icon={<UserIcon size={20} className='text-center' />} register={register} />
                    <Divider />
                    <InputSection label='البريد الالكتروني' type='email' id='email' value={user?.user_metadata?.email} icon={<Mail size={20} className='text-center' />} register={register} />
                    <Divider />
                    <InputSection label='رقم الهاتف' type='tel' id='phone' value={user?.user_metadata?.phone_number} icon={<Phone size={20} className='text-center' />} register={register} />
                    <Divider />
                    <InputSection label='كلمة المرور' type='password' id='password' placeholder={"***********"} icon={<KeyRound size={20} className='text-center' />} register={register} />
                    <Divider />
                    <InputSection label='تأكيد كلمة المرور' type='password' id='confirm_password' placeholder={"***********"} icon={<KeyRound size={20} className='text-center' />} register={register} />
                </div>
            </form>
        </section>
    )
}

export default GeneralSettings;