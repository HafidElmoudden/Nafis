import { useState } from 'react'
import { Button } from '@/components/ui/button'
import Divider from 'components/divider'
import { useForm } from 'react-hook-form'
import { Mail, School } from 'lucide-react'
import InputSection from '../input-section'
import TrashIcon from 'assets/icons/trash-icon.svg'
import EditIcon from 'assets/icons/edit-icon.svg'
import AvatarIcon from 'assets/default_avatar.png'
import { cn } from 'utils'
import Input from 'components/Input'
import Switch from 'components/Switch'
import { useSchoolClasses } from 'hooks/useSchoolClasses'
import { useSchool } from 'hooks/useSchool'
import { MultiSelector, MultiSelectorContent, MultiSelectorInput, MultiSelectorItem, MultiSelectorList, MultiSelectorTrigger } from 'components/multi-selector'
import { addTeacherToSchool } from 'api/services/TeacherService'
import { useSchoolTeachers } from 'hooks/useSchoolTeachers'

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
    setValue
  } = useForm()
  const [dropdownValue, setDropdownValue] = useState([]);
  const { school, loading, error } = useSchool();
  const schoolClasses = useSchoolClasses(school?.school_code);
  const schoolTeachers = useSchoolTeachers(school?.school_code);
  console.log("schoolTeachers: ", schoolTeachers);
  const classOptions = schoolClasses?.schoolClasses?.map((item) => {
    return {
      value: item.id,
      label: item.class_label
    }
  })
  const onSubmit = async (data) => {
    console.log("FormData: ", data);
    await addTeacherToSchool(school?.school_code, data);
  }
  const handleDropdownChange = (selectedOptions) => {
    console.log("handleDropdownChange: ", selectedOptions);
    setValue('class', selectedOptions.map((e) => classOptions?.find((el) => el.label == e).value));
    console.log("register qsdfsdqf: ", selectedOptions.map((e) => classOptions?.find((el) => el.label == e).value))
    setDropdownValue(selectedOptions);
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
        {/* <Divider />
        <div className='flex flex-col w-full items-end h-full'>
          <InputSection isNotInput label='اضافة حساب' subLabel="قم بملئ الحقول بالمعلومات الخاصة بالحساب الذي ترغب باضافته مع الصلاحيات المرغوب منحها للحساب">
            <Input type='email' id='email' placeholder="...البريد الالكتروني" icon={<Mail size={20} className='text-center' />} register={register} />
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

            <Switch label={"انشاء حساب"} multipleId={"permissions"} id={"add_users"} setValue={setValue} />
            <Switch label={"ادخال بيانات الطلاب"} multipleId={"permissions"} id={"insert_students_data"} setValue={setValue} />
            <Switch label={"ادخال بيانات المعلمين"} multipleId={"permissions"} id={"insert_teachers_data"} setValue={setValue} />
            <Switch label={"ارسال الاختبارات"} multipleId={"permissions"} id={"send_tests"} setValue={setValue} />
            <Switch label={"اطلاع على التحليل"} multipleId={"permissions"} id={"view_analytics"} setValue={setValue} />
            <Switch label={"اطلاع على الخطة العلاجية"} multipleId={"permissions"} id={"view_recover_plan"} setValue={setValue} />
          </InputSection>
          <Divider />
          <InputSection isNotInput label={"الحسابات المضافة"} subLabel={"يمكنك رؤية الحسابات المفعلة وتعديل الصلاحيات الخاصة بالحسابات"}>
            <div className='flex flex-col gap-3 justify-center items-center'>
              {schoolTeachers?.data?.map((teacher) => (
                <TeacherCard email={teacher.email} isActive={teacher.status} />
              ))}
            </div>
          </InputSection>
        </div>
       */}
      </form>
    </section>
  )
}

export default TeacherSettings