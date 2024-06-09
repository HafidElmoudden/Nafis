import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import Divider from 'components/divider'
import { useForm } from 'react-hook-form'
import DropdownSection from 'components/dropdown'
import { Mail, Pencil, Phone, School, UserIcon } from 'lucide-react'
import FileChooserSection from 'components/fileupload-section'
import InputSection from './input-section'
import DocumentIcon from 'assets/icons/document-icon.svg'
import TrashIcon from 'assets/icons/trash-icon.svg'
import EditIcon from 'assets/icons/edit-icon.svg'
import AvatarIcon from 'assets/default_avatar.png'
import { cn } from 'utils'
import { InputContainer, Input, Dropdown, Switch } from './input-container'
import { useSchoolClasses } from 'hooks/useSchoolClasses'
import { useSchool } from 'hooks/useSchool'
import { MultiSelector, MultiSelectorContent, MultiSelectorInput, MultiSelectorItem, MultiSelectorList, MultiSelectorTrigger } from 'components/multi-selector'

const TeacherCard = ({ email, isActive = false }) => {
  return <div className='flex flex-col gap-1'>
    {
      <div className='relative flex flex-row-reverse justify-start items-center px-3 gap-3 focus-within:outline w-[400px] h-[72px] focus-within:outline-primary focus-within:border-transparent bg-white font-medium box-border rounded-lg border border-accent-100 outline-none shadow-sm overflow-hidden'>
        <img src={AvatarIcon} alt='document icon' className='size-10' />
        <div
          className='flex flex-col '
        >
          <div className='text-[14px] font-semibold font-inter'>{email}</div>
          <div className="text-[14px] text-muted-foreground font-inter">
            الحالة : <span className={cn(isActive && "text-green-600", !isActive && "text-red-600")}>{isActive ? "مفعل" : "غير مفعل"}</span>
          </div>
        </div>
        <img
          src={EditIcon}
          alt="pencil icon"
          className="size-5 absolute top-3 left-4 transition-all duration-100 hover:scale-110 cursor-pointer"
        />

        <img
          src={TrashIcon}
          alt="trash icon"
          className="size-5 absolute top-10 left-4 transition-all duration-100 hover:scale-110 cursor-pointer"
        />


      </div>
    }
  </div>
}

function TeacherSettings() {
  const {
    register,
    handleSubmit,
    watch,
    formState,
  } = useForm()
  const [dropdownValue, setDropdownValue] = useState([]);
  const onSubmit = (data) => console.log(data)
  const { school, loading, error } = useSchool();
  const schoolClasses = useSchoolClasses(school?.school_code);
  const classOptions = schoolClasses?.schoolClasses?.map((item) => {
    return {
      value: item.id,
      label: item.class_label
    }
  })
  const handleDropdownChange = (selectedOptions) => {
    setDropdownValue(selectedOptions);
    register('class', { value: selectedOptions.map(option => option.value), label: selectedOptions.map(option => option.label) });
  };
  return (
    <section>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-row-reverse justify-between items-center">
          <div>
            <h1 className='text-lg font-semibold'>اعدادات المعلمين</h1>
            <span className='text-sm text-muted-foreground'>هذا القسم خاص بإدارة حسابات المعلمين.</span>
          </div>
          <div className='space-x-4'>
            <Button variant="secondary">حذف التغييرات</Button>
            <Button type='submit'>حفظ</Button>
          </div>
        </div>
        <Divider />
        <div className='flex flex-col w-full items-end'>
          <InputContainer label='اضافة حساب' subLabel="قم بملئ الحقول بالمعلومات الخاصة بالحساب الذي ترغب باضافته مع الصلاحيات المرغوب منحها للحساب">
            {/* <Input type='text' id='full_name' placeholder="...الاسم الكامل" icon={<UserIcon size={20} className='text-center' />} register={register} /> */}
            <Input type='email' id='email' placeholder="...البريد الالكتروني" icon={<Mail size={20} className='text-center' />} register={register} />
            {/* <Input type='tel' id='phone' placeholder="...رقم الهاتف" icon={<Phone size={20} className='text-center' />} register={register} /> */}
            {/* <Dropdown id='class' register={register} comboBoxData={classOptions} icon={<School size={20} className='text-center' />} /> */}
            <MultiSelector values={dropdownValue} onValuesChange={handleDropdownChange} loop className="max-w-xs">
              <MultiSelectorTrigger className='w-[400px]' icon={<School size={20} className='text-center' />}>
                <MultiSelectorInput className='pr-[15px]' placeholder="...صفوف المعلم" />
              </MultiSelectorTrigger>
              <MultiSelectorContent>
                <MultiSelectorList>
                  {!schoolClasses?.loading && classOptions?.map(option => (
                    <MultiSelectorItem key={option.value} value={option.label}>
                      {option.label}
                    </MultiSelectorItem>
                  ))}
                </MultiSelectorList>
              </MultiSelectorContent>
            </MultiSelector>

            <Switch label={"انشاء حساب"} multipleId={"permissions"} id={"add_users"} register={register} />
            <Switch label={"ادخال بيانات الطلاب"} multipleId={"permissions"} id={"insert_students_data"} register={register} />
            <Switch label={"ادخال بيانات المعلمين"} multipleId={"permissions"} id={"insert_teachers_data"} register={register} />
            <Switch label={"ارسال الاختبارات"} multipleId={"permissions"} id={"send_tests"} register={register} />
            <Switch label={"اطلاع على التحليل"} multipleId={"permissions"} id={"view_analytics"} register={register} />
            <Switch label={"اطلاع على الخطة العلاجية"} multipleId={"permissions"} id={"view_recover_plan"} register={register} />
          </InputContainer>
          <Divider />
          <InputSection notInput label={"الحسابات المضافة"} subLabel={"يمكنك رؤية الحسابات المفعلة وتعديل الصلاحيات الخاصة بالحسابات"}>
            <div className='flex flex-col gap-3 justify-center items-center'>
              <TeacherCard email="abdulhafid858@gmail.com" />
              <TeacherCard email="saied@gmail.com" isActive={true} />
            </div>
          </InputSection>
        </div>
      </form>
    </section>
  )
}

export default TeacherSettings