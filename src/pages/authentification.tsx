import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import { SignInAuthForm } from '../components/authentification/signin-auth-form';
import { Sign } from "crypto";
import { SignUpAuthForm } from "components/authentification/signup-auth-form";

export type AuthTab = "sign-in" | "sign-up";
type AuthFormProps = {
  currentTabHandler: (newTab: AuthTab) => void;
}

function SignInForm({ currentTabHandler }: AuthFormProps) {
  return <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
    <div className="flex flex-col space-y-2 text-center">
      <h1 className="text-2xl font-semibold tracking-tight text-center">
        تسجيل الدخول
      </h1>
      <p className="text-sm text-muted-foreground">

      </p>
    </div>
    <SignInAuthForm currentTabHandler={currentTabHandler} />
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

  </div>;
}

function SignUpForm({ currentTabHandler }: AuthFormProps) {
  return <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
    <div className="flex flex-col space-y-2 text-center">
      <h1 className="text-2xl font-semibold tracking-tight text-center">
        إنشاء حساب
      </h1>
      <p className="text-sm text-muted-foreground text-center">
        يمكنك إنشاء حساب لتبدأ في استخدام خدماتنا
      </p>
    </div>
    <SignUpAuthForm currentTabHandler={currentTabHandler} />
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

  </div>;
}

function Authentification() {
  const [currentTab, setCurrentTab] = React.useState<AuthTab>("sign-in");

  const currentTabHandler = (newTab: AuthTab) => {
    setCurrentTab(newTab);
  }

  return (
    <div className="lg:p-8 h-screen w-screen flex justify-center items-center">
      {currentTab == "sign-in"
        ? <SignInForm currentTabHandler={currentTabHandler} />
        : <SignUpForm currentTabHandler={currentTabHandler} />
      }
    </div>
  );


}

export default Authentification;
