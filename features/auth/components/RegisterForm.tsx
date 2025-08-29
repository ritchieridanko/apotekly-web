"use client";

import { FC } from "react";

import { ROUTES } from "@/constants";
import {
  AuthButton,
  AuthTextField,
  RedirectLink,
} from "@/features/auth/components";
import { useRegisterForm } from "@/features/auth/hooks";

const RegisterForm: FC = () => {
  const {
    form,
    errors,
    setEmail,
    setPassword,
    setConfirmPassword,
    handleRegister,
  } = useRegisterForm();
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

      <AuthTextField
        label="Confirm Password"
        placeholder="Enter your password"
        value={form.confirmPassword}
        validity={{
          isValid: !errors.confirmPassword,
          invalidLabel: errors.confirmPassword || "",
        }}
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
        onClick={handleRegister}
      />
    </div>
  );
};

export default RegisterForm;
