import { PillProps } from "@/app/types/tinylibrary";

export default function Pill({ children, className = "" }: PillProps) {
  return (
    <span
      className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium uppercase tracking-wide bg-stone-100 text-stone-700 border border-stone-200 ${className}`}
    >
      {children}
    </span>
  );
}