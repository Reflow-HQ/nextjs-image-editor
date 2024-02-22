import { ReactNode } from "react";

interface Props {
  onClick?: () => void;
  active?: boolean;
  disabled?: boolean;
  title?: string;
  children: ReactNode;
}

export default function IconButton({
  onClick,
  active,
  disabled,
  title,
  children,
}: Props) {
  return (
    <button
      className={`w-[46px] h-[46px] flex items-center justify-center hover:bg-slate-300/10 rounded-full ${
        active ? "text-sky-300 bg-slate-300/10" : "text-slate-300"
      }`}
      title={title}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
