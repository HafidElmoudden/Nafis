"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
// import { Icons } from "../../assets/Icons"
import Spinner from "components/Spinner"
import { Link, useNavigate } from "react-router-dom"
import { FieldValue, FieldValues, useForm } from "react-hook-form"
import { supabase } from "api/SupabaseClient"
import { AuthTab } from "pages/authentification-page"
import { signInUser, verifyModeratorIsSchoolCoordinator } from "api/services/UserServices"
import Input from "components/Input"
import { EnvelopeClosedIcon } from "@radix-ui/react-icons"
import GeometricShape from "assets/geometric_shape.svg"
import InboxIcon from "assets/icons/inbox-icon.svg"
import LockIcon from "assets/icons/lock-icon.svg"
import clsx from "clsx"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/components/ui/use-toast"

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
  currentTabHandler: (newTab: AuthTab) => void;
}

export function SignInAuthForm({ className, currentTabHandler, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm({ mode: "onChange" });
  const { toast } = useToast();

  console.log("Erorrs: ", errors)

  async function onSubmit(_data: FieldValues) {
    console.log("hello : ", _data);
    const { data, error } = await signInUser(_data.email, _data.password);
    const { data: moderatorSchoolVerification } = await verifyModeratorIsSchoolCoordinator(data.session?.user.id)
    console.log("moderatorSchoolVerification: ", moderatorSchoolVerification)
    if (!error) {
      console.log("type", data.session?.user.user_metadata.user_type)
      if ((!data.session?.user.user_metadata.user_type || (moderatorSchoolVerification as any[])?.length == 0) && data.session?.user.user_metadata.user_type !== "admin") {
        navigate("/onboarding");
      } else {
        navigate("/home");
      }
    } else {
      toast({
        variant: "destructive",
        title: "!حدث خطأ",
        description: ".المرجو التأكد من البريد الإلكتروني وكلمة المرور والمحاولة مرة أخرى",
        duration: 5000,
      });
    }
  }

  return (
    <form className="flex flex-col gap-5 w-[360px]" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-3">
        <p className="text-[#101828] text-4xl">تسجيل الدخول</p>
        <p className="text-[#475467]">.مرحبًا بعودتك! الرجاء إدخال التفاصيل الخاصة بك</p>
      </div>
      <div className="flex flex-col gap-5">
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
            register={register("email", { required: ".المرجو ملئ الحقل بالشكل الصحيح" })}
          />
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
            className={clsx("w-[360px] h-[44px]", errors.password ? "border-red-500" : "")}
            // autoCapitalize="none"
            // autoComplete="password"
            // autoCorrect="off"
            // className={errors.email ? "border-red-500" : ""}
            register={register("password", { required: ".المرجو ملئ الحقل بالشكل الصحيح" })}
          />
        </div>
        <div className="flex justify-between items-center">
          <div className="flex gap-2 items-center justify-center">
            <Checkbox id="rememberme" color="black" className="border-[#D0D5DD] data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-500" />
            <label
              htmlFor="rememberme"
              className="text-sm font-medium"
            >
              تذكرني
            </label>
          </div>
          <p className="text-blue-700 cursor-pointer">نسيت كلمة المرور</p>
        </div>
        <Button className="h-[44px]" disabled={isLoading} type="submit">
          {isLoading && (
            <Spinner className="mr-2 h-4 w-4 animate-spin" />
          )}
          تسجيل الدخول
        </Button>
        <Button variant={"outline"} className="h-[44px]" onClick={(e) => { currentTabHandler("sign-up") }}>
          انشاء حساب
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