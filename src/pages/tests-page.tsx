import { Breadcrumb, BreadcrumbItem } from 'components/breadcrumb'
import tasks from 'components/table/data/tests-page/tests-data-placeholder'
import React from 'react'
import HomeIcon from 'assets/icons/navbar/home-icon'
import FilePlusIcon from 'assets/icons/file-plus-icon.svg'
import { Button } from '@/components/ui/button'
import { columns } from 'components/table/tables-columns/tests-page/tests-table-columns'
import { DataTable } from 'components/table/data-table'
import useTestCreateDialog from 'hooks/useTestCreateDialog'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Dropdown } from 'components/dropdown'
import { cn, getRandomColor } from 'utils'
import { Badge } from '@/components/ui/badge'
import { Plus, X } from 'lucide-react'
import Input from 'components/Input'

const classes = [
  { id: 1, name: 'الصف الثالث الابتدائي' },
  { id: 2, name: 'الصف السادس الابتدائي' },
  { id: 3, name: 'الصف الثالث المتوسط' },
];

const subjects = [
  { id: 1, name: 'القراءة' },
  { id: 2, name: 'الرياضيات' },
  { id: 3, name: 'العلوم' },
]

const skills = [
  { id: 1, name: 'القراءة والفهم' },
  { id: 2, name: 'الكتابة' },
  { id: 3, name: 'الاحصاء' },
  { id: 4, name: 'الاملاء الصحيح' },
  { id: 5, name: 'الحفظ' },
]

const SkillBadge = ({ title, numberOfTests, onRemove }: { title: string, numberOfTests: number, onRemove: () => void }) => {
  const color = getRandomColor();
  console.log("we got:", color);

  const bgColor100 = "bg-" + color + "-100";
  const textColor700 = "text-" + color + "-700";
  const textColor600 = "text-" + color + "-600";
  const bgColor400 = "bg-" + color + "-400";

  return (
    <Badge className={cn(bgColor100, "font-normal", textColor700, "flex-row-reverse h-fit gap-[6px]")}>
      <X className={cn("size-[16px]", textColor600, "font-semibold hover:text-red-700 cursor-pointer")} onClick={onRemove} />
      {title}
      <Badge className={cn(bgColor400, "font-inter px-1.5 min-w-[15px] h-[15px] text-white")}>
        {numberOfTests}
      </Badge>
    </Badge>
  );
};

const SkillBadgesContainer = ({ children }: { children: React.ReactNode }) => (
  <div className="flex flex-row-reverse flex-wrap min-h-[68px] gap-2 border border-[#D0D5DD] shadow-sm rounded-lg px-[14px] py-[10px]">{children}</div>
);


function TestsPage() {
  const {
    isOpen,
    openDialog,
    closeDialog,
    register,
    handleSubmit,
    setValue,
    getValues,
    onSubmit,
    addSkill,
    removeSkill,
    skillList,
    setIsOpen
  } = useTestCreateDialog();

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
          <Button variant={"default"} className='w-[130px]' onClick={openDialog}>
            <img src={FilePlusIcon} alt="file-plus-icon" className='pr-2' />
            انشاء اختبار
          </Button>
        </div>
        <div className='bg-[#EAECF0] w-full h-px' />
      </header>

      <DataTable data={tasks} columns={columns} />

      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>انشاء اختبار</AlertDialogTitle>
          </AlertDialogHeader>
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <p className="text-[#344054] text-sm">الصنف</p>
              <RadioGroup defaultValue="comfortable" className="flex flex-row-reverse justify-start gap-8">
                <div className="flex items-center space-x-2">
                  <Label htmlFor="r1" className="text-black">قبلي</Label>
                  <RadioGroupItem value="default" id="r1" {...register("testType")} />
                </div>
                <div className="flex items-center space-x-2">
                  <Label htmlFor="r2">بعدي</Label>
                  <RadioGroupItem value="comfortable" id="r2" {...register("testType")} />
                </div>
              </RadioGroup>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-[#344054] text-sm">الصف</p>
              <Dropdown items={classes} onSelect={(value) => setValue("class", value)} placeholder="...قم باختيار صف" tooltipMessage="سيتم تخصيص الاختبار قيد الانشاء للصف المحدد" />
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-[#344054] text-sm">المادة</p>
              <Dropdown items={subjects} onSelect={(value) => setValue("subject", value)} placeholder="...قم باختيار مادة" />
            </div>

            <div className="flex flex-col gap-2">
              <p className="text-[#344054] text-sm">المهارات</p>
              <SkillBadgesContainer>
                {skillList.map((skill, index) => (
                  <SkillBadge
                    key={index}
                    title={(skill as { skill: { name: string } }).skill.name}
                    numberOfTests={(skill as { skill: { name: string }, numberOfQuestions: number }).numberOfQuestions}
                    onRemove={() => removeSkill(index)}
                  />
                ))}
              </SkillBadgesContainer>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-[#344054] text-sm">اضافة مهارة</p>
              <div className="flex gap-1.5">
                <Button variant={"default"} type="button" className="w-12" onClick={addSkill}>
                  <Plus size={32} />
                </Button>
                <Input type="number" className="flex-1" placeholder="...عدد الاسئلة" register={register("numberQuestions")} />
                <Dropdown className="flex-1" items={skills} onSelect={(value) => setValue("skill", value)} placeholder="...قائمة المهارات" />
              </div>
            </div>
          </div>
          <AlertDialogFooter className="justify-start sm:justify-start">
            <AlertDialogAction onClick={handleSubmit(onSubmit)}>
              انشاء اختبار
            </AlertDialogAction>
            <AlertDialogCancel onClick={closeDialog}>
              الغاء
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div >
  )
}

export default TestsPage