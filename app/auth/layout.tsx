import { FC, ReactNode } from "react";

const AuthLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="h-screen w-full flex justify-center items-center scrolling-auth-bg overflow-y-auto">
      <div className="p-[30px] w-[450px] bg-white rounded-sm ring-8 ring-black/30">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
