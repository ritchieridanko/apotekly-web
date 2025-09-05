import { FC } from "react";

const XCircle: FC<IconProps> = ({ strokeWidth, size }) => {
  const sizeClasses = {
    4: "h-4 w-4",
    5: "h-5 w-5",
    6: "h-6 w-6",
    7: "h-7 w-7",
    8: "h-8 w-8",
    9: "h-9 w-9",
    10: "h-10 w-10",
    24: "h-24 w-24",
  };

  const sizeClass = sizeClasses[size as keyof typeof sizeClasses] || "h-7 w-7";

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={strokeWidth}
      stroke="currentColor"
      className={`${sizeClass}`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
      />
    </svg>
  );
};

export default XCircle;
