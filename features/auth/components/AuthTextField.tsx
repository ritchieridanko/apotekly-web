"use client";

import { FC, useState } from "react";

import { Eye, EyeSlash } from "@/assets/icons";
import { TextField } from "@/components";

interface AuthTextFieldProps {
  label: string;
  placeholder: string;
  value: string;
  validity: { isValid: boolean; invalidLabel: string };
  isDisabled: boolean;
  withSecurity?: boolean;
  onChange: (value: string) => void;
}

const AuthTextField: FC<AuthTextFieldProps> = ({
  label,
  placeholder,
  value,
  validity,
  isDisabled,
  withSecurity = false,
  onChange,
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  return (
    <div className="w-full flex flex-col justify-center items-start gap-1 font-sans text-sm text-start">
      <p className="font-medium text-black">
        {label} <span className="text-red-500">*</span>
      </p>
      <TextField
        placeholder={isDisabled ? "" : placeholder}
        value={value}
        isSecured={withSecurity && !isVisible}
        isDisabled={isDisabled}
        onChange={onChange}
        variant={{ intent: "auth", isValueValid: validity.isValid }}
      >
        {withSecurity && (
          <button
            type="button"
            className="absolute top-1.5 right-2 cursor-pointer transition-all duration-200 ease-in-out hover:text-[var(--brand)] disabled:text-gray-500 disabled:cursor-default"
            disabled={isDisabled}
            onClick={() => setIsVisible((prev) => !prev)}
          >
            {isVisible ? (
              <Eye strokeWidth={1} size={6} />
            ) : (
              <EyeSlash strokeWidth={1} size={6} />
            )}
          </button>
        )}
      </TextField>
      <p className={`${validity.isValid && "hidden"} font-normal text-red-500`}>
        {validity.invalidLabel}
      </p>
    </div>
  );
};

export default AuthTextField;
