"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [searchTerm, setSearchTerm] = useState(searchParams.get("q") || "");

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    startTransition(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (term) {
        params.set("q", term);
      } else {
        params.delete("q");
      }
      router.push(`?${params.toString()}`);
    });
  };

  return (
    <div className="relative w-full max-w-md">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Search books by title, author, or keyword..."
        className="w-full px-4 py-3 pl-10 bg-white border border-stone-200 rounded-2xl text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-900 transition-all shadow-sm"
      />
      <svg
        className="absolute left-3.5 top-3.5 h-4 w-4 text-stone-400"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      {isPending && (
        <span className="absolute right-3.5 top-3.5 text-xs text-stone-400">Searching...</span>
      )}
    </div>
  );
}