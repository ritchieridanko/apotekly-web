"use client";

import { FC, ReactNode } from "react";
import { tv, VariantProps } from "tailwind-variants";

const textField = tv({
  base: "px-2 py-1.5 w-full rounded-sm font-sans font-normal cursor-text transition-all duration-200 ease-in-out placeholder:font-sans placeholder:font-normal disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-default",
  variants: {
    intent: {
      auth: "text-black text-base outline outline-black placeholder:text-gray-500 placeholder:text-base focus:outline-2 focus:outline-[var(--brand)] focus:ring-4 focus:ring-[var(--brand)]/50 disabled:outline-gray-100",
    },
    isValueValid: {
      true: "",
      false: "outline-red-500",
    },
  },
});

interface TextFieldProps {
  placeholder: string;
  value: string;
  isSecured?: boolean;
  isDisabled?: boolean;
  onChange: (value: string) => void;
  variant: VariantProps<typeof textField>;
  children: ReactNode;
}

const TextField: FC<TextFieldProps> = ({
  placeholder,
  value,
  isSecured = false,
  isDisabled = false,
  onChange,
  variant,
  children,
}) => {
  return (
    <div className="relative w-full">
      <input
        type={isSecured ? "password" : "text"}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={textField(variant)}
        disabled={isDisabled}
      />
      {children}
    </div>
  );
};

export default TextField;
