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
interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> { }

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  async function onSubmit(data: FieldValues) {
    setIsLoading(true)

    setTimeout(() => {
      if(data.email === "admin@admin" && data.password === "admin"){
        navigate("/home")
      } else {
        alert("Invalid credentials")
      }
      setIsLoading(false)
    }, 1000)
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
                value="admin@admin"
                autoCorrect="off"
                disabled={isLoading}
                {...register("email")}
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
                value="admin"
                autoCapitalize="none"
                autoComplete="password"
                autoCorrect="off"
                disabled={isLoading}
                {...register("password")}
              />
            </div>
          </div>
          <Button disabled={isLoading}>
            {isLoading && (
              <Spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            تسجيل الدخول بالايميل
          </Button>
        </div>
      </form>
    </div>
  )
}