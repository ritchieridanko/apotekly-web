"use client";

import { FC } from "react";

import { Apple, Google, Microsoft } from "@/assets/logos";
import { OAuthButton } from "@/features/auth/components";

const OAuthGroup: FC = () => {
  const isLoading: boolean = false;

  return (
    <div className="w-full flex flex-col justify-center items-center gap-4">
      <OAuthButton
        title="Google"
        icon={Google}
        isLoading={isLoading}
        onClick={() => {}}
      />

      <OAuthButton
        title="Apple"
        icon={Apple}
        isLoading={isLoading}
        onClick={() => {}}
      />

      <OAuthButton
        title="Microsoft"
        icon={Microsoft}
        isLoading={isLoading}
        onClick={() => {}}
      />
    </div>
  );
};

export default OAuthGroup;
