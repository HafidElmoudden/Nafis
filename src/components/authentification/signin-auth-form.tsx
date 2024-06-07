"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
// import { Icons } from "../../assets/Icons"
import Spinner from "components/Spinner"
import { useNavigate } from "react-router-dom"
import { FieldValue, FieldValues, useForm } from "react-hook-form"
import { supabase } from "api/SupabaseClient"
import { AuthTab } from "pages/authentification"
import { signInUser } from "api/services/UserServices"

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
  currentTabHandler: (newTab: AuthTab) => void;
}

export function SignInAuthForm({ className, currentTabHandler, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
  console.log("Erorrs: ", errors)

  async function onSubmit(_data: FieldValues) {
    const { data, error } = await signInUser(_data.email, _data.password);
    if(!error) {
      if(!data.session?.user.user_metadata.user_type) {
        navigate("/onboarding");
      } else {
        navigate("/home");
      }
    } else {
      alert("Error: " + error.message)
    }
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <div className="grid gap-3">
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
            تسجيل الدخول بالايميل
          </Button>
          <Button variant={"secondary"} type="button" onClick={(e) => { e.preventDefault(); currentTabHandler("sign-up") }}>
            انشاء حساب جديد
          </Button>
        </div>
      </form>
    </div>
  )
}