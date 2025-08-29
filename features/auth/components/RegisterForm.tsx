"use client";

import { FC, useState } from "react";

import { ROUTES } from "@/constants";
import {
  AuthButton,
  AuthTextField,
  RedirectLink,
} from "@/features/auth/components";

const RegisterForm: FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const isLoading: boolean = false;

  return (
    <div className="w-full flex flex-col justify-center items-center gap-4">
      <AuthTextField
        label="Email"
        placeholder="Enter your email"
        value={email}
        validity={{ isValid: true, invalidLabel: "" }}
        isDisabled={isLoading}
        onChange={setEmail}
      />

      <AuthTextField
        label="Password"
        placeholder="Enter your password"
        value={password}
        validity={{ isValid: true, invalidLabel: "" }}
        isDisabled={isLoading}
        withSecurity
        onChange={setPassword}
      />

      <AuthTextField
        label="Confirm Password"
        placeholder="Enter your password"
        value={confirmPassword}
        validity={{ isValid: true, invalidLabel: "" }}
        isDisabled={isLoading}
        withSecurity
        onChange={setConfirmPassword}
      />

      <div className="w-full font-sans font-normal text-black text-sm text-center">
        <p className="inline">By registering, I accept the </p>{" "}
        <RedirectLink
          title="Terms of Service"
          href={ROUTES.LEGAL.TOS}
          isDisabled={isLoading}
          isSecondary
        />{" "}
        <p className="inline">and acknowledge the</p>{" "}
        <RedirectLink
          title="Privacy Policy"
          href={ROUTES.LEGAL.PRIVACY_POLICY}
          isDisabled={isLoading}
          isSecondary
        />
        {"."}
      </div>

      <AuthButton
        title="Register"
        loadingTitle="Registering..."
        isLoading={isLoading}
        onClick={() => {}}
      />
    </div>
  );
};

export default RegisterForm;
