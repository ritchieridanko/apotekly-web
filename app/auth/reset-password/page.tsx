import { FC } from "react";

import { ResetPasswordForm } from "@/features/auth/components";

const ResetPasswordPage: FC = () => {
  return (
    <div className="w-full flex flex-col justify-between items-center gap-4 font-sans font-normal text-black text-base">
      <h2 className="w-full font-mono font-extrabold text-[var(--brand)] text-4xl text-center select-none">
        {process.env.NEXT_PUBLIC_APP_NAME}
      </h2>
      <p className="w-full text-center">Reset Password</p>
      <ResetPasswordForm />
    </div>
  );
};

export default ResetPasswordPage;
