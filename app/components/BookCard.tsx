"use client";

import Link from "next/link";
import { BookCardProps } from "@/app/types/tinylibrary";
import Pill from "@/app/components/Pill";

export default function BookCard({ book }: BookCardProps) {
  // Check if image is missing or points to the broken place-hold domain
  const isPlaceholder = !book.image || book.image.includes("place-hold.it");

  // Fallback to a unique seed-based image URL per book ID
  const coverUrl = isPlaceholder
    ? `https://picsum.photos/seed/book-${book.id}/300/400`
    : book.image;

  return (
    <Link
      href={`/books/${book.id}`}
      className="group block bg-white border border-stone-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5"
    >
      <div className="aspect-[3/4] bg-stone-100 relative overflow-hidden flex items-center justify-center">
        <img
          src={coverUrl}
          alt={book.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
      </div>

      <div className="p-4 flex flex-col gap-2">
        <div className="flex items-center justify-between gap-2">
          <Pill className="bg-amber-50 text-amber-800 border-amber-200/60">
            {book.category}
          </Pill>
          <span className="text-xs text-stone-500 font-medium flex items-center gap-1">
            ❤️ {book.likes}
          </span>
        </div>

        <h3 className="font-serif font-bold text-stone-900 group-hover:text-amber-800 transition-colors line-clamp-1">
          {book.name}
        </h3>

        <p className="text-sm text-stone-600 line-clamp-1">
          by {book.author}
        </p>
      </div>
    </Link>
  );
}