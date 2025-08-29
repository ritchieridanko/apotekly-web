"use client";

import { FC, ReactNode } from "react";
import { tv, VariantProps } from "tailwind-variants";

const button = tv({
  base: "px-2 py-1.5 w-full flex flex-row justify-center items-center gap-2 rounded-sm font-sans cursor-pointer transition-all duration-200 ease-in-out disabled:cursor-default",
  variants: {
    auth: {
      primary:
        "bg-[var(--brand)] font-medium text-white text-lg outline outline-[var(--brand)] hover:bg-[var(--brand)]/80 focus:ring-4 focus:ring-[var(--brand)]/50 active:bg-[var(--dark-brand)] disabled:bg-[var(--dark-brand)]",
      secondary:
        "font-normal text-black text-base outline outline-gray-400/50 hover:bg-gray-100 focus:outline-2 focus:outline-[var(--brand)] focus:ring-4 focus:ring-[var(--brand)]/50 active:bg-gray-200 disabled:bg-gray-100 disabled:outline-gray-100",
    },
  },
});

interface ButtonProps {
  isDisabled?: boolean;
  onClick: () => void;
  variant: VariantProps<typeof button>;
  children: ReactNode;
}

const Button: FC<ButtonProps> = ({
  isDisabled = false,
  onClick,
  variant,
  children,
}) => {
  return (
    <button
      type="button"
      className={button(variant)}
      onClick={onClick}
      disabled={isDisabled}
    >
      {children}
    </button>
  );
};

export default Button;
