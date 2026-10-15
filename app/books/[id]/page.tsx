import Link from "next/link";
import { notFound } from "next/navigation";
import { BookDetailPageProps } from "@/app/types/tinylibrary";
import { getBookById } from "../../lib/books";
import Pill from "../../components/Pill";

export default async function BookDetailPage({ params }: BookDetailPageProps) {
  const { id } = await params;

  let book;
  try {
    book = await getBookById(id);
  } catch (error) {
    notFound();
  }

  const isPlaceholder = !book.image || book.image.includes("place-hold.it");
  const coverUrl = isPlaceholder
    ? `https://picsum.photos/seed/book-${book.id}/600/800`
    : book.image;

  const formattedDate = new Date(book.dateAdded).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-8 py-4">
      <Link
        href="/books"
        className="inline-flex items-center gap-2 text-sm font-medium text-stone-600 hover:text-stone-900 transition-colors w-fit"
      >
        ← Back to all books
      </Link>

      <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-sm grid grid-cols-1 md:grid-cols-12 gap-6 p-6 md:p-8">
        <div className="md:col-span-5 aspect-[3/4] bg-stone-100 rounded-xl border border-stone-200/80 overflow-hidden relative shadow-inner flex items-center justify-center">
          <img
            src={coverUrl}
            alt={book.name}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="md:col-span-7 flex flex-col justify-between gap-6">
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between gap-2">
              <Pill className="bg-amber-50 text-amber-900 border-amber-200">
                {book.category}
              </Pill>
              <span className="text-xs text-stone-500 font-medium flex items-center gap-1 bg-stone-100 px-3 py-1 rounded-full border border-stone-200">
                ❤️ {book.likes} likes
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-serif font-bold text-stone-900 tracking-tight mt-1">
              {book.name}
            </h1>

            <p className="text-lg font-medium text-stone-600">
              By <span className="text-stone-800">{book.author}</span>
            </p>
          </div>

          <div className="border-t border-b border-stone-100 py-4 flex flex-col gap-3 text-sm text-stone-600">
            <div className="flex justify-between py-1">
              <span className="text-stone-500">Catalog ID</span>
              <span className="font-mono text-stone-800">#{book.id}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-stone-500">Date Added</span>
              <span className="text-stone-800">{formattedDate}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-stone-500">Availability</span>
              <span className="text-emerald-700 font-medium">In Stock (Indie Pick)</span>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="font-serif font-semibold text-stone-900">
              Why you might like this book
            </h3>
            <p className="text-sm text-stone-600 leading-relaxed">
              Hand-curated by our community librarians. If you enjoy thought-provoking{" "}
              <span className="capitalize font-medium">{book.category}</span> titles with strong
              character development and engaging narratives, <span className="italic">{book.name}</span> is a recommended addition to your reading list.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}