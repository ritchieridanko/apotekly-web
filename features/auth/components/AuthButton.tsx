"use client";

import { FC } from "react";

import { Button, Spinner } from "@/components";

interface AuthButtonProps {
  title: string;
  loadingTitle: string;
  isLoading: boolean;
  onClick: () => void;
}

const AuthButton: FC<AuthButtonProps> = ({
  title,
  loadingTitle,
  isLoading,
  onClick,
}) => {
  return (
    <Button
      isDisabled={isLoading}
      onClick={onClick}
      variant={{ auth: "primary" }}
    >
      {isLoading ? (
        <div className="w-full flex flex-row justify-center items-center gap-4">
          <Spinner strokeWidth={3.5} size={7} />
          <p>{loadingTitle}</p>
        </div>
      ) : (
        <p>{title}</p>
      )}
    </Button>
  );
};

export default AuthButton;
