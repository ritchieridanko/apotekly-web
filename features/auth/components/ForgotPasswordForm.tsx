"use client";

import { FC } from "react";

import { AuthButton, AuthTextField } from "@/features/auth/components";
import { useForgotPasswordForm } from "@/features/auth/hooks";

const ForgotPasswordForm: FC = () => {
  const { form, errors, setEmail, isLoading, handleForgotPassword } =
    useForgotPasswordForm();

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

      <AuthButton
        title="Send Reset Link"
        loadingTitle="Sending..."
        isLoading={isLoading}
        onClick={handleForgotPassword}
      />
    </div>
  );
};

export default ForgotPasswordForm;
