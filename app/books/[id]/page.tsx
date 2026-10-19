import Link from "next/link";
import { getBookById, getAllBooks } from "@/app/lib/books";
import { Book } from "@/app/types/tinylibrary";
import Image from "next/image";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function BookDetailPage({ params }: PageProps) {
  try {
    const resolvedParams = await params;
    const bookId = Number(resolvedParams.id);
    const book: Book | undefined = await getBookById(bookId);

    if (!book) {
      return (
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-serif font-bold text-stone-900 mb-4">Book Not Found</h1>
          <p className="text-stone-600 mb-8">The book you are looking for does not exist or has been removed.</p>
          <Link
            href="/books"
            className="px-6 py-3 bg-stone-900 text-white rounded-xl text-sm font-medium hover:bg-stone-800 transition-colors"
          >
            Back to Library Catalog
          </Link>
        </div>
      );
    }

    // Safely retrieve description if present on the book object
    const bookDescription = (book as { description?: string }).description;

    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Link
          href="/books"
          className="inline-flex items-center text-sm font-medium text-stone-600 hover:text-stone-900 mb-8 transition-colors"
        >
          &larr; Back to Catalog
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 bg-white border border-stone-200 rounded-3xl p-8 shadow-sm">
          <div className="relative aspect-[3/4] bg-stone-100 rounded-2xl overflow-hidden shadow-md">
            {book.image ? (
              <Image
                src={book.image}
                alt={book.name}
                fill
                className="object-cover"
              />
            ) : (
              <div className="flex items-center justify-center h-full text-stone-400 text-sm">
                No Cover Available
              </div>
            )}
          </div>

          <div className="md:col-span-2 flex flex-col justify-between">
            <div>
              <span className="inline-block px-3 py-1 bg-stone-100 text-stone-800 text-xs font-semibold rounded-full uppercase tracking-wider mb-4">
                {book.category}
              </span>
              <h1 className="text-3xl font-serif font-bold text-stone-900 mb-2">{book.name}</h1>
              <p className="text-lg text-stone-600 mb-6 font-medium">By {book.author}</p>
              
              <div className="border-t border-stone-100 pt-6">
                <h3 className="text-sm font-semibold text-stone-900 uppercase tracking-wider mb-2">About this book</h3>
                <p className="text-stone-600 text-sm leading-relaxed">{bookDescription || "No description provided."}</p>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-stone-100 flex items-center gap-4">
              <Link
                href={`/books/category/${encodeURIComponent(book.category)}`}
                className="px-5 py-2.5 bg-stone-900 text-white rounded-xl text-sm font-medium hover:bg-stone-800 transition-colors"
              >
                More in {book.category}
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  } catch {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-serif font-bold text-stone-900 mb-4">Something went wrong</h1>
        <p className="text-stone-600 mb-8">Unable to load book details at this time.</p>
        <Link
          href="/books"
          className="px-6 py-3 bg-stone-900 text-white rounded-xl text-sm font-medium hover:bg-stone-800 transition-colors"
        >
          Back to Library Catalog
        </Link>
      </div>
    );
  }
}

export async function generateStaticParams() {
  const books: Book[] = await getAllBooks();
  return books.map((book) => ({
    id: String(book.id),
  }));
}