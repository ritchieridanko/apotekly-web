"use client";

import { useRouter } from "next/navigation";
import { FC } from "react";

import { Link } from "@/components";

interface RedirectLinkProps {
  title: string;
  href: string;
  isDisabled: boolean;
  isSecondary?: boolean;
}

const RedirectLink: FC<RedirectLinkProps> = ({
  title,
  href,
  isDisabled,
  isSecondary = false,
}) => {
  const router = useRouter();

  return (
    <Link
      onClick={() => router.push(href)}
      isDisabled={isDisabled}
      variant={{ auth: isSecondary ? "secondary" : "primary", isDisabled }}
    >
      {title}
    </Link>
  );
};

export default RedirectLink;
