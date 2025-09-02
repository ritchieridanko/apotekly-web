"use client";

import { FC } from "react";

import { Apple, Google, Microsoft } from "@/assets/logos";
import { OAuthButton } from "@/features/auth/components";
import { useAppSelector } from "@/stores/hooks";

const OAuthGroup: FC = () => {
  const isLoading: boolean = useAppSelector((state) => state.auth.isLoading);

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
