import { FC } from "react";

import { ROUTES } from "@/constants";
import {
  AuthFooter,
  OAuthGroup,
  RegisterForm,
} from "@/features/auth/components";

const RegisterPage: FC = () => {
  return (
    <div className="w-full flex flex-col justify-between items-center gap-4 font-sans font-normal text-black text-base">
      <h2 className="w-full font-mono font-extrabold text-[var(--brand)] text-4xl text-center select-none">
        {process.env.NEXT_PUBLIC_APP_NAME}
      </h2>
      <p className="w-full text-center">Create an account</p>
      <RegisterForm />
      <p className="w-full text-gray-500 text-center">Or continue with</p>
      <OAuthGroup />
      <AuthFooter
        title="Login!"
        text="Already have an account?"
        href={ROUTES.AUTH.LOGIN}
      />
    </div>
  );
};

export default RegisterPage;
