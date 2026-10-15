import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-10 py-4">
      {/* Hero Section */}
      <div className="bg-amber-50/60 border border-amber-200/60 p-8 rounded-2xl flex flex-col gap-3">
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-stone-900">
          About Tiny Library
        </h1>
        <p className="text-stone-700 leading-relaxed text-lg">
          Welcome to Tiny Library — an independent book discovery hub dedicated to helping readers find exceptional titles across fiction, non-fiction, fantasy, and beyond.
        </p>
      </div>

      {/* Vision Section */}
      <section className="flex flex-col gap-3">
        <h2 className="text-2xl font-serif font-bold text-stone-900">Our Vision</h2>
        <p className="text-stone-600 leading-relaxed">
          In a world dominated by algorithmic bestsellers, Tiny Library brings back the warmth of neighborhood book browsing. We highlight hidden gems and classic staples in a minimalist, distraction-free environment.
        </p>
      </section>

      {/* Key Features Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border border-stone-200 p-6 rounded-xl flex flex-col gap-2">
          <span className="text-2xl">📚</span>
          <h3 className="font-serif font-semibold text-stone-900">Curated Catalogue</h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            Every title in our 52-book collection is selected for quality and reader engagement.
          </p>
        </div>

        <div className="bg-white border border-stone-200 p-6 rounded-xl flex flex-col gap-2">
          <span className="text-2xl">🔍</span>
          <h3 className="font-serif font-semibold text-stone-900">Easy to Browse</h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            Filter seamlessly by category or search directly by author and title in real time.
          </p>
        </div>

        <div className="bg-white border border-stone-200 p-6 rounded-xl flex flex-col gap-2">
          <span className="text-2xl">🤝</span>
          <h3 className="font-serif font-semibold text-stone-900">Readers First</h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            No clutter, ads, or sponsored lists — just pure discovery for book lovers.
          </p>
        </div>
      </section>

      {/* Contact CTA */}
      <div className="border-t border-stone-200 pt-6 flex items-center justify-between">
        <p className="text-sm text-stone-600">Have questions or recommendations?</p>
        <Link
          href="/about/contact"
          className="px-4 py-2 bg-stone-900 text-white text-sm font-medium rounded-lg hover:bg-stone-800 transition-colors"
        >
          Contact Us
        </Link>
      </div>
    </div>
  );
}