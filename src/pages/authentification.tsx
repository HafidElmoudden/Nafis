import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import { SignInAuthForm } from '../components/authentification/signin-auth-form';
import { Sign } from "crypto";
import { SignUpAuthForm } from "components/authentification/signup-auth-form";
import GeometricShape from "assets/geometric_shape.svg"

export type AuthTab = "sign-in" | "sign-up";
type AuthFormProps = {
  currentTabHandler: (newTab: AuthTab) => void;
}

function Authentification() {
  const [currentTab, setCurrentTab] = React.useState<AuthTab>("sign-in");

  const currentTabHandler = (newTab: AuthTab) => {
    setCurrentTab(newTab);
  }

  return (
    <div className="h-screen w-screen flex items-center justify-between">
      <div className="flex-1">
        <img src={GeometricShape} className="h-screen object-cover" />
      </div>

      <div className="flex flex-1 items-center justify-center">
        {currentTab == "sign-in"
          ? <SignInAuthForm currentTabHandler={currentTabHandler} />
          : <SignUpAuthForm currentTabHandler={currentTabHandler} />
        }
      </div>
    </div>
  );


}

export default Authentification;
