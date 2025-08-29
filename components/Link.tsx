"use client";

import { FC, MouseEvent, ReactNode } from "react";
import { tv, VariantProps } from "tailwind-variants";

const link = tv({
  base: "font-sans cursor-pointer hover:underline",
  variants: {
    auth: {
      primary: "font-semibold text-[var(--brand)] text-base",
      secondary: "font-normal text-blue-500 text-sm",
    },
    isDisabled: {
      true: "text-gray-500 cursor-default pointer-events-none",
      false: "",
    },
  },
});

interface LinkProps {
  inNewTab?: boolean;
  isDisabled?: boolean;
  onClick: () => void;
  variant: VariantProps<typeof link>;
  children: ReactNode;
}

const Link: FC<LinkProps> = ({
  inNewTab = false,
  isDisabled = false,
  onClick,
  variant,
  children,
}) => {
  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (!isDisabled) {
      e.preventDefault();
      e.stopPropagation();
      onClick();
    }
  };

  return (
    <a
      target={inNewTab ? "_blank" : "_self"}
      className={link(variant)}
      onClick={(e) => handleClick(e)}
    >
      {children}
    </a>
  );
};

export default Link;
