"use client";

interface InputProps {
  type?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({ type = "text", onChange }: InputProps) {
  return (
    <input
      type={type}
      onChange={onChange}
      className="grow bg-transparent border border-gray-300 text-slate-300 rounded-lg min-w-0 px-5 py-2.5"
    />
  );
}
