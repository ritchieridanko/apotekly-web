"use client";

import { FC } from "react";

import { Spinner } from "@/components";
import {
  AuthButton,
  AuthTextField,
  InvalidResetTokenSection,
} from "@/features/auth/components";
import {
  useResetPasswordForm,
  useTokenValidation,
} from "@/features/auth/hooks";

const ResetPasswordForm: FC = () => {
  const {
    form,
    errors,
    setPassword,
    setConfirmPassword,
    isLoading,
    handleResetPassword,
  } = useResetPasswordForm();
  const { token, isValid, isValidating } = useTokenValidation();

  if (isValidating) {
    return (
      <div className="w-full flex flex-col justify-center items-center gap-4">
        <Spinner strokeWidth={3.5} size={7} />
        <p className="font-sans font-normal text-[var(--brand)] text-base">
          Validating token...
        </p>
      </div>
    );
  }

  if (!isValid) {
    return <InvalidResetTokenSection />;
  }

  return (
    <div className="w-full flex flex-col justify-center items-center gap-4">
      <AuthTextField
        label="New Password"
        placeholder="Enter your new password"
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
        label="Confirm New Password"
        placeholder="Enter your new password"
        value={form.confirmPassword}
        validity={{
          isValid: !errors.confirmPassword,
          invalidLabel: errors.confirmPassword || "",
        }}
        isDisabled={isLoading}
        withSecurity
        onChange={setConfirmPassword}
      />

      <AuthButton
        title="Reset Password"
        loadingTitle="Resetting..."
        isLoading={isLoading}
        onClick={() => handleResetPassword(token)}
      />
    </div>
  );
};

export default ResetPasswordForm;
