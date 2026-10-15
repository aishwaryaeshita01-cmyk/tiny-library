import Link from "next/link";
import { getAllBooks, getAllCategories } from "./lib/books";
import BooksGrid from "./components/BooksGrid";
import Pill from "./components/Pill";

export default async function HomePage() {
  const allBooks = await getAllBooks();
  const categories = await getAllCategories();

  // Get top 5 most liked books as featured
  const featuredBooks = [...allBooks]
    .sort((a, b) => b.likes - a.likes)
    .slice(0, 5);

  return (
    <div className="flex flex-col gap-12 py-4">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-amber-100/80 via-amber-50 to-stone-100 border border-amber-200/80 p-8 md:p-12 rounded-3xl text-center flex flex-col items-center gap-4 shadow-sm">
        <Pill className="bg-amber-200/80 text-amber-900 border-amber-300">
          Hand-Curated Collection
        </Pill>
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-stone-900 tracking-tight max-w-2xl">
          Welcome to Tiny Library
        </h1>
        <p className="text-stone-700 text-base md:text-lg max-w-xl leading-relaxed">
          Explore our collection of 52 hand-picked books across fiction, non-fiction, fantasy, and self-help.
        </p>
        <div className="flex items-center gap-3 mt-2">
          <Link
            href="/books"
            className="px-6 py-3 bg-stone-900 text-white font-medium rounded-xl hover:bg-stone-800 transition-all shadow-md hover:shadow-lg"
          >
            Browse All Books →
          </Link>
          <Link
            href="/about"
            className="px-6 py-3 bg-white text-stone-700 border border-stone-300 font-medium rounded-xl hover:bg-stone-50 transition-colors"
          >
            About Us
          </Link>
        </div>
      </section>

      {/* Featured / Popular Books */}
      <section className="flex flex-col gap-6">
        <div className="flex items-center justify-between border-b border-stone-200 pb-3">
          <h2 className="text-2xl font-serif font-bold text-stone-900">
            Most Popular Picks
          </h2>
          <Link
            href="/books"
            className="text-sm font-semibold text-amber-900 hover:underline"
          >
            View full catalogue →
          </Link>
        </div>
        <BooksGrid books={featuredBooks} />
      </section>

      {/* Categories Grid */}
      <section className="flex flex-col gap-6">
        <div className="border-b border-stone-200 pb-3">
          <h2 className="text-2xl font-serif font-bold text-stone-900">
            Explore Categories
          </h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/books/category/${cat.slug}`}
              className="p-4 bg-white border border-stone-200 rounded-xl hover:border-amber-300 hover:shadow-md transition-all group flex flex-col justify-between"
            >
              <span className="font-serif font-semibold text-stone-800 group-hover:text-amber-900 transition-colors">
                {cat.label}
              </span>
              <span className="text-xs text-stone-500 mt-2">
                Browse collection →
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}