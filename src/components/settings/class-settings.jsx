import { Button } from '@/components/ui/button'
import Divider from 'components/divider';
import React, { useEffect } from 'react'
import InputSection from './input-section';
import { Code, KeyRound, Mail, Phone, SchoolIcon, UserIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useAtom, useAtomValue } from 'jotai';
import { schoolDataAtom } from 'atoms/schoolAtom';
import useUser from 'atoms/userAtom';
import { getSchoolInformationsForModerator } from 'api/services/SchoolServices';

function ClassSettings() {
    const {
        register,
        handleSubmit,
        watch,
        formState,
        setValue
    } = useForm()

    const onSubmit = (data) => console.log(data)

    const [schoolData, setSchoolData] = useAtom(schoolDataAtom)
    const user = useUser();

    useEffect(() => {
        getSchoolInformationsForModerator(user.id).then((response) => {
            if (response.data) {
                setSchoolData(response.data);
                Object.keys(response.data).forEach((key) => {
                    setValue(key, response.data[key]);
                });
                setValue("nafis_coordinator", user.user_metadata.full_name);
            }
        });
    }, [user, setValue])
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
                    <InputSection label='الصف الثالث' type='text' value={schoolData?.num_third_class} id='num_third_class' icon={<SchoolIcon size={20} className='text-center' />} register={register} />
                    <Divider />
                    <InputSection label='الصف السادس' type='text' value={schoolData?.num_sixth_class} id='num_sixth_class' icon={<SchoolIcon size={20} className='text-center' />} register={register} />
                    <Divider />
                    <InputSection label='الصف الثالث المتوسط' type='text' value={schoolData?.num_third_mid_class} id='num_third_mid_class' icon={<SchoolIcon size={20} className='text-center' />} register={register} />
                </div>
            </form>
        </section>
    )
}

export default ClassSettings;