"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

type NavLinkProps = {
  href: string;
  children: ReactNode;
  exact?: boolean;
};

export default function NavLink({ href, children, exact = false }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = exact ? pathname === href : pathname.startsWith(href);

  return (
    <Link
      href={href}
      className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition-all ${
        isActive
          ? "bg-amber-100 text-amber-900 font-semibold shadow-sm"
          : "text-stone-600 hover:text-stone-900 hover:bg-stone-100"
      }`}
    >
      {children}
    </Link>
  );
}