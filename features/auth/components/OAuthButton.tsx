"use client";

import Image from "next/image";
import { FC } from "react";

import { Button } from "@/components";

interface OAuthButtonProps {
  title: string;
  icon: string;
  isLoading: boolean;
  onClick: () => void;
}

const OAuthButton: FC<OAuthButtonProps> = ({
  title,
  icon,
  isLoading,
  onClick,
}) => {
  return (
    <Button
      isDisabled={isLoading}
      onClick={onClick}
      variant={{ auth: "secondary" }}
    >
      <Image src={icon} alt={title} className="h-6 w-6" />
      <p>{title}</p>
    </Button>
  );
};

export default OAuthButton;
