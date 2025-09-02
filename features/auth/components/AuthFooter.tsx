"use client";

import { FC } from "react";

import { RedirectLink } from "@/features/auth/components";
import { useAppSelector } from "@/stores/hooks";

interface AuthFooterProps {
  title: string;
  text: string;
  href: string;
}

const AuthFooter: FC<AuthFooterProps> = ({ title, text, href }) => {
  const isLoading: boolean = useAppSelector((state) => state.auth.isLoading);

  return (
    <p className="w-full text-center">
      {text} <RedirectLink title={title} href={href} isDisabled={isLoading} />
    </p>
  );
};

export default AuthFooter;
