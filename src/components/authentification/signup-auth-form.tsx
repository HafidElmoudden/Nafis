"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Spinner from "components/Spinner"
import { useNavigate } from "react-router-dom"
import { FieldValues, useForm } from "react-hook-form"
import { AuthTab } from "pages/authentification"
import { signUpUser } from "api/services/UserServices"

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
  currentTabHandler: (newTab: AuthTab) => void;
}

export function SignUpAuthForm({ className, currentTabHandler, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
  async function onSubmit(_data: FieldValues) {
    setIsLoading(true)
    const { data, error } = await signUpUser(_data.full_name, _data.email, _data.password, _data.birth_date, _data.phone_number)
    console.log("Sign Up data: ", data);
    if(!error)
      currentTabHandler("sign-in");
    else 
      alert("Error: " + error.message)
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <div className="grid gap-3">
            <div>
              <Label htmlFor="full_name">
                الاسم الكامل              
              </Label>
              <Input
                id="full_name"
                type="text"
                autoCorrect="off"
                disabled={isLoading}
                className={errors.first_name ? "border-red-500" : ""}
                {...register("full_name", { required: true })}
              />
            </div>
            <div>
              <Label htmlFor="phone_number">
                رقم الهاتف
              </Label>
              <Input
                id="phone_number"
                type="tel"
                autoCapitalize="none"
                autoCorrect="off"
                disabled={isLoading}
                className={errors.phone_number ? "border-red-500" : ""}
                {...register("phone_number", { required: true })}
              />
            </div>
            <div>
              <Label htmlFor="birth_date">
                تاريخ الازدياد
              </Label>
              <Input
                id="birth_date"
                type="date"
                autoCapitalize="none"
                autoCorrect="off"
                disabled={isLoading}
                className={errors.birth_date ? "border-red-500" : ""}
                {...register("birth_date", { required: true })}
              />
            </div>
            <div>
              <Label htmlFor="email">
                الايميل
              </Label>
              <Input
                id="email"
                placeholder="name@example.com"
                type="email"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect="off"
                disabled={isLoading}
                className={errors.email ? "border-red-500" : ""}
                {...register("email", { required: true })}
              />
            </div>
            <div>
              <Label htmlFor="email" className="bold">
                الباسورد
              </Label>
              <Input
                id="password"
                placeholder="**************"
                type="password"
                autoCapitalize="none"
                autoComplete="password"
                autoCorrect="off"
                className={errors.email ? "border-red-500" : ""}

                disabled={isLoading}
                {...register("password", { required: true })}
              />
            </div>
          </div>
          <Button disabled={isLoading}>
            {isLoading && (
              <Spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            انشاء الحساب
          </Button>
          <Button variant={"secondary"} type="button" onClick={(e) => { e.preventDefault(); currentTabHandler("sign-in") }}>
            تسجيل الدخول
          </Button>
        </div>
      </form>
    </div>
  )
}