// import './App.css';
// import { Link } from "react-router-dom";
import { Link, Route, Routes } from "react-router-dom";
import { UserAuthForm } from '../components/authentification/user-auth-form';
function Authentification() {
  return (
    <div className="lg:p-8 h-screen w-screen flex justify-center items-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight text-center">
            تسجيل الدخول
          </h1>
          <p className="text-sm text-muted-foreground">

          </p>
        </div>
        <UserAuthForm />
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
    </div>
  );
}

export default Authentification;
