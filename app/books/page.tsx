import Link from "next/link";
import BookCard from "@/app/components/BookCard";
import SearchBar from "@/app/components/SearchBar";
import { getAllBooks } from "../lib/books";

interface BooksPageProps {
  searchParams: Promise<{
    q?: string;
  }>;
}

export default async function BooksPage({ searchParams }: BooksPageProps) {
  const resolvedParams = await searchParams;
  const query = (resolvedParams.q || "").toLowerCase().trim();

  const allBooks = (await getAllBooks()) || [];

  // Filter books if a search query is present
  const filteredBooks = allBooks.filter((book: any) => {
    if (!query) return true;
    const title = (book.title || "").toLowerCase();
    const author = (book.author || "").toLowerCase();
    const category = (book.category || "").toLowerCase();
    return title.includes(query) || author.includes(query) || category.includes(query);
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col gap-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold text-stone-900">Library Catalog</h1>
          <p className="text-sm text-stone-600">Explore our complete collection of curated titles.</p>
        </div>
        <SearchBar />
      </div>

      {query && (
        <div className="flex items-center justify-between bg-stone-50 border border-stone-200 px-4 py-3 rounded-xl text-sm">
          <span className="text-stone-600">
            Found {filteredBooks.length} result{filteredBooks.length === 1 ? "" : "s"} for &ldquo;<span className="font-semibold text-stone-900">{query}</span>&rdquo;
          </span>
          <Link href="/books" className="text-stone-900 font-medium hover:underline text-xs">
            Clear search
          </Link>
        </div>
      )}

      {filteredBooks.length === 0 ? (
        <div className="bg-white border border-stone-200 rounded-2xl p-12 text-center flex flex-col items-center gap-4">
          <p className="text-stone-600">No books matched your search.</p>
          <Link
            href="/books"
            className="px-4 py-2 bg-stone-900 text-white rounded-xl text-sm font-medium hover:bg-stone-800 transition-colors"
          >
            View All Books
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
}