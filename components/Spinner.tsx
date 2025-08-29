import { FC } from "react";

const Spinner: FC<IconProps> = ({ strokeWidth, size = 7 }) => {
  const sizeClasses = {
    4: "h-4 w-4",
    5: "h-5 w-5",
    6: "h-6 w-6",
    7: "h-7 w-7",
    8: "h-8 w-8",
    9: "h-9 w-9",
    10: "h-10 w-10",
  };

  const sizeClass = sizeClasses[size as keyof typeof sizeClasses] || "h-7 w-7";

  return (
    <svg
      className={`${sizeClass} animate-spin`}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth={strokeWidth}
      />
      <circle
        className="opacity-75"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeDasharray="60"
        strokeDashoffset="40"
      />
    </svg>
  );
};

export default Spinner;
