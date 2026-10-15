import Link from "next/link";
import BookCard from "@/app/components/BookCard";

// Safe dynamic loader for books to prevent any 500 crashes
async function getBooksSafely() {
  try {
    // Try absolute alias first
    const { getAllBooks } = require("@/lib/books");
    return await getAllBooks();
  } catch {
    try {
      // Fallback to app-relative import
      const { getAllBooks } = require("@/app/lib/books");
      return await getAllBooks();
    } catch {
      // Fallback to relative path from [category] folder
      const { getAllBooks } = require("../../../lib/books");
      return await getAllBooks();
    }
  }
}

interface CategoryPageProps {
  params: Promise<{
    category: string;
  }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  try {
    const resolvedParams = await params;
    const rawCategory = decodeURIComponent(resolvedParams.category || "").toLowerCase();

    const allBooks = (await getBooksSafely()) || [];

    const filteredBooks = allBooks.filter((book: any) => {
      if (!book || !book.category) return false;
      const bookCat = book.category.toLowerCase();
      return (
        bookCat === rawCategory ||
        bookCat.replace(/\s+/g, "-") === rawCategory ||
        rawCategory.replace(/-/g, " ") === bookCat
      );
    });

    const displayCategory = rawCategory
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    return (
      <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col gap-8">
        <div className="flex flex-col gap-3">
          <Link
            href="/books"
            className="inline-flex items-center gap-2 text-sm font-medium text-stone-600 hover:text-stone-900 transition-colors w-fit"
          >
            ← Back to all books
          </Link>

          <div className="flex flex-col gap-1">
            <h1 className="text-3xl font-serif font-bold text-stone-900 capitalize">
              {displayCategory} Books
            </h1>
            <p className="text-sm text-stone-600">
              Showing {filteredBooks.length} curated title{filteredBooks.length === 1 ? "" : "s"} in this category.
            </p>
          </div>
        </div>

        {filteredBooks.length === 0 ? (
          <div className="bg-white border border-stone-200 rounded-2xl p-12 text-center flex flex-col items-center gap-4">
            <p className="text-stone-600">No books found in this category yet.</p>
            <Link
              href="/books"
              className="px-4 py-2 bg-stone-900 text-white rounded-xl text-sm font-medium hover:bg-stone-800 transition-colors"
            >
              Browse Full Catalog
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredBooks.map((book: any) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        )}
      </div>
    );
  } catch (error: any) {
    console.error("Category page error:", error);
    return (
      <div className="max-w-xl mx-auto mt-20 p-8 bg-white border border-stone-200 rounded-2xl text-center flex flex-col gap-4">
        <h2 className="text-2xl font-serif font-bold text-stone-900">Category View Loading...</h2>
        <p className="text-sm text-stone-600">
          We are getting your category filters ready. If this persists, check your terminal for details.
        </p>
        <Link
          href="/books"
          className="px-4 py-2 bg-stone-900 text-white rounded-xl text-sm font-medium w-fit mx-auto"
        >
          Back to All Books
        </Link>
      </div>
    );
  }
}