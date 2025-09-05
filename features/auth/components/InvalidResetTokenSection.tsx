"use client";

import { useRouter } from "next/navigation";
import { FC } from "react";

import { XCircle } from "@/assets/icons";
import { ROUTES } from "@/constants";
import { AuthButton } from "@/features/auth/components";

const InvalidResetTokenSection: FC = () => {
  const router = useRouter();

  return (
    <div className="w-full flex flex-col justify-center items-center gap-8">
      <div className="w-full flex flex-col justify-center items-center gap-2 text-red-500">
        <XCircle strokeWidth={1} size={24} />
        <p className="font-sans font-medium text-red-500 text-lg text-center">
          Invalid or Expired Link
        </p>
      </div>
      <AuthButton
        title="Back to Login"
        loadingTitle=""
        isLoading={false}
        onClick={() => router.push(ROUTES.AUTH.LOGIN)}
      />
    </div>
  );
};

export default InvalidResetTokenSection;
