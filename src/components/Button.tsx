import { ReactNode } from "react";

interface ButtonProps {
  onClick: () => void;
  disabled?: boolean;
  children: ReactNode;
}

export default function Button({
  onClick,
  disabled = false,
  children,
}: ButtonProps) {
  return (
    <button
      className="text-gray-900 bg-white border border-gray-300 disabled:bg-gray-300 focus:outline-none enabled:hover:bg-gray-100 
  focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 
  dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:enabled:hover:bg-gray-700 dark:enabled:hover:border-gray-600 
  dark:focus:ring-gray-700"
      disabled={disabled}
      onClick={() => onClick()}
    >
      {children}
    </button>
  );
}
