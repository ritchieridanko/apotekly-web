"use client";

import { FC } from "react";

import { ROUTES } from "@/constants";
import {
  AuthButton,
  AuthTextField,
  RedirectLink,
} from "@/features/auth/components";
import { useLoginForm } from "@/features/auth/hooks";

const LoginForm: FC = () => {
  const { form, errors, setEmail, setPassword, handleLogin } = useLoginForm();
  const isLoading: boolean = false;

  return (
    <div className="w-full flex flex-col justify-center items-center gap-4">
      <AuthTextField
        label="Email"
        placeholder="Enter your email"
        value={form.email}
        validity={{ isValid: !errors.email, invalidLabel: errors.email || "" }}
        isDisabled={isLoading}
        onChange={setEmail}
      />

      <AuthTextField
        label="Password"
        placeholder="Enter your password"
        value={form.password}
        validity={{
          isValid: !errors.password,
          invalidLabel: errors.password || "",
        }}
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
        onClick={handleLogin}
      />
    </div>
  );
};

export default LoginForm;
