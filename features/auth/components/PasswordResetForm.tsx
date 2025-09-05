"use client";

import { FC } from "react";

import { AuthButton, AuthTextField } from "@/features/auth/components";

const PasswordResetForm: FC = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center gap-4">
      <AuthTextField
        label="New Password"
        placeholder="Enter your new password"
        value={""}
        validity={{ isValid: true, invalidLabel: "" }}
        isDisabled={false}
        withSecurity
        onChange={() => {}}
      />

      <AuthTextField
        label="Confirm New Password"
        placeholder="Enter your new password"
        value={""}
        validity={{ isValid: true, invalidLabel: "" }}
        isDisabled={false}
        withSecurity
        onChange={() => {}}
      />

      <AuthButton
        title="Reset Password"
        loadingTitle="Resetting..."
        isLoading={false}
        onClick={() => {}}
      />
    </div>
  );
};

export default PasswordResetForm;
