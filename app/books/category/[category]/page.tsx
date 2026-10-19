import Link from "next/link";
import BookCard from "@/app/components/BookCard";
import { getAllBooks } from "@/app/lib/books";
import { Book } from "@/app/types/tinylibrary";

interface CategoryPageProps {
  params: Promise<{
    category: string;
  }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const resolvedParams = await params;
  const decodedCategory = decodeURIComponent(resolvedParams.category);

  const allBooks: Book[] = await getAllBooks();
  const categoryBooks = allBooks.filter(
    (book: Book) => book.category.toLowerCase() === decodedCategory.toLowerCase()
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <div>
          <Link href="/books" className="text-xs font-medium text-stone-500 hover:text-stone-900 mb-2 inline-block">
            &larr; Back to all books
          </Link>
          <h1 className="text-3xl font-serif font-bold text-stone-900 capitalize">{decodedCategory} Books</h1>
          <p className="text-sm text-stone-600">Browse all titles filed under {decodedCategory}.</p>
        </div>
      </div>

      {categoryBooks.length === 0 ? (
        <div className="bg-white border border-stone-200 rounded-2xl p-12 text-center flex flex-col items-center gap-4">
          <p className="text-stone-600">No books found in this category.</p>
          <Link
            href="/books"
            className="px-4 py-2 bg-stone-900 text-white rounded-xl text-sm font-medium hover:bg-stone-800 transition-colors"
          >
            View All Books
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categoryBooks.map((book: Book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      )}
    </div>
  );
}