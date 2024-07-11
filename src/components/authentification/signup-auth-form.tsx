"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import Spinner from "components/Spinner"
import { Link, useNavigate } from "react-router-dom"
import { FieldValues, useForm } from "react-hook-form"
import { AuthTab } from "pages/authentification-page"
import { signUpUser } from "api/services/UserServices"
import { Checkbox } from "@/components/ui/checkbox"
import clsx from "clsx"
import InboxIcon from "assets/icons/inbox-icon.svg"
import LockIcon from "assets/icons/lock-icon.svg"
import PhoneIcon from "assets/icons/phone-icon.svg"
import CalendarIcon from "assets/icons/calendar-icon.svg"
import Input from "components/Input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
  currentTabHandler: (newTab: AuthTab) => void;
}

export function SignUpAuthForm({ className, currentTabHandler, ...props }: UserAuthFormProps) {
  const [date, setDate] = React.useState<Date>()
  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
  async function onSubmit(_data: FieldValues) {
    setIsLoading(true)
    const { data, error } = await signUpUser(_data.full_name, _data.email, _data.password, _data.birth_date, _data.phone_number)
    console.log("Sign Up data: ", data);
    if (!error)
      currentTabHandler("sign-in");
    else
      alert("Error: " + error.message)
  }

  return (
    <form className="flex flex-col gap-4 w-[360px]" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-2">
        <p className="text-[#101828] text-4xl">انشاء حساب</p>
        <p className="text-[#475467]">يمكنك انشاء حساب لتبدأ في استخدام خدماتنا</p>
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-[6px]">
          <Label htmlFor="full_name" className="text-sm text-[#344054] font-medium">
            الاسم الكامل
          </Label>
          <Input
            icon={<img src={InboxIcon} className="w-full h-full" />}
            id="full_name"
            placeholder="أدخل اسمك الكامل"
            type="text"
            className={clsx("w-[360px] h-[44px]", errors.full_name ? "border-red-500" : "")}
            // autoCapitalize="none"
            // autoComplete="email"
            // autoCorrect="off"
            register={register("full_name", { required: true })} />
        </div>
        <div className="flex flex-col gap-[6px]">
          <Label htmlFor="phone_number" className="text-sm text-[#344054] font-medium">
            رقم الهاتف
          </Label>
          <Input
            icon={<img src={PhoneIcon} className="w-full h-full" />}
            id="phone_number"
            placeholder="+966-12345678"
            type="tel"
            className={clsx("w-[360px] h-[44px]", errors.phone_number ? "border-red-500" : "")}
            // autoCapitalize="none"
            // autoComplete="email"
            // autoCorrect="off"
            register={register("phone_number", { required: true })} />
        </div>
        <div className="flex flex-col gap-[6px]">
          <Label htmlFor="birth_date" className="text-sm text-[#344054] font-medium">
            تاريخ الازدياد
          </Label>
          <Popover>
            <PopoverTrigger>
              <Input
                icon={<img src={CalendarIcon} className="w-full h-full" />}
                id="birth_date"
                placeholder="س/ي/ش"
                className={clsx("w-[360px] h-[44px]", errors.birth_date ? "border-red-500" : "")}
                // autoCapitalize="none"
                // autoComplete="email"
                // autoCorrect="off"
                value={date?.toLocaleDateString()}
                register={register("birth_date", { required: true })} />
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        <div className="flex flex-col gap-[6px]">
          <Label htmlFor="email" className="text-sm text-[#344054] font-medium">
            البريد الإلكتروني
          </Label>
          <Input
            icon={<img src={InboxIcon} className="w-full h-full" />}
            id="email"
            placeholder="أدخل بريدك الالكتروني"
            type="email"
            className={clsx("w-[360px] h-[44px]", errors.email ? "border-red-500" : "")}
            // autoCapitalize="none"
            // autoComplete="email"
            // autoCorrect="off"
            register={register("email", { required: true })} />
        </div>
        <div className="flex flex-col gap-[6px]">
          <Label htmlFor="password" className="text-sm text-[#344054] font-medium">
            كلمة المرور
          </Label>
          <Input
            icon={<img src={LockIcon} className="w-full h-full" />}
            id="password"
            placeholder="**************"
            type="password"
            className={clsx("w-[360px] h-[44px]", errors.email ? "border-red-500" : "")}
            // autoCapitalize="none"
            // autoComplete="password"
            // autoCorrect="off"
            // className={errors.email ? "border-red-500" : ""}
            register = {register("password", { required: true })} />
        </div>
        <Button variant={"default"} className="h-[44px]" disabled={isLoading} type="submit">
        {isLoading && (
            <Spinner className="mr-2 h-4 w-4 animate-spin" />
          )}
          انشاء حساب
        </Button>
        <Button className="h-[44px]" variant={"outline"} onClick={(e) => { e.preventDefault(); currentTabHandler("sign-in") }}>
          تسجيل الدخول
        </Button>
      </div>

      <div>
        <p className="px-8 text-center text-sm text-muted-foreground">
          بالنقر فوق الاستمرار، أنت توافق على {" "}
          <Link
            to="/"
            className="underline underline-offset-4 hover:text-primary"
          >
            شروط الخدمة
          </Link>
          {" "}
          و {" "}
          <Link
            to="/"
            className="underline underline-offset-4 hover:text-primary"
          >
            سياسة الخصوصية
          </Link>
          .
        </p>
      </div>
    </form>
  )
}