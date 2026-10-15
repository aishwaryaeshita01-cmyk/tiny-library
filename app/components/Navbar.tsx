"use client";

import Link from "next/link";
import NavLink from "./NavLink";

export default function Navbar() {
  return (
    <header className="border-b border-stone-200 bg-stone-50/90 backdrop-blur sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link 
          href="/" 
          className="text-xl font-serif font-bold text-stone-800 tracking-tight flex items-center gap-2"
        >
          <span>📚</span> Tiny Library
        </Link>
        <nav className="flex items-center gap-1 sm:gap-2">
          <NavLink href="/" exact>Home</NavLink>
          <NavLink href="/books">Books</NavLink>
          <NavLink href="/about">About</NavLink>
        </nav>
      </div>
    </header>
  );
}