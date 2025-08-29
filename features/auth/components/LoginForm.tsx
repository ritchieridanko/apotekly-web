"use client";

import { FC, useState } from "react";

import { ROUTES } from "@/constants";
import {
  AuthButton,
  AuthTextField,
  RedirectLink,
} from "@/features/auth/components";

const LoginForm: FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
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

      <div className="w-full">
        <RedirectLink
          title="Forgot password?"
          href={ROUTES.AUTH.FORGOT_PASSWORD}
          isDisabled={isLoading}
          isSecondary
        />
      </div>

      <AuthButton
        title="Login"
        loadingTitle="Logging In..."
        isLoading={isLoading}
        onClick={() => {}}
      />
    </div>
  );
};

export default LoginForm;
