export default function ContactPage() {
  return (
    <div className="max-w-2xl mx-auto flex flex-col gap-6 py-4">
      <div className="border-b border-stone-200 pb-4">
        <h1 className="text-3xl font-serif font-bold text-stone-900">Contact Us</h1>
        <p className="text-stone-600 text-sm mt-1">
          We would love to hear from you! Get in touch with the Tiny Library team.
        </p>
      </div>

      <div className="bg-white border border-stone-200 p-6 rounded-xl flex flex-col gap-4">
        <p className="text-stone-700 text-sm leading-relaxed">
          Reach out if you would like to:
        </p>
        <ul className="list-disc list-inside text-sm text-stone-600 flex flex-col gap-1.5">
          <li>Recommend a book for inclusion in Tiny Library</li>
          <li>Report a mistake or inaccurate detail</li>
          <li>Inquire about collaboration or community features</li>
        </ul>

        <div className="mt-4 p-4 bg-stone-50 border border-stone-200 rounded-lg">
          <p className="text-xs text-stone-500 font-medium uppercase tracking-wider">Email Us</p>
          <a
            href="mailto:hello@tinylibrary.example"
            className="text-amber-900 font-medium text-base hover:underline mt-1 block"
          >
            hello@tinylibrary.example
          </a>
        </div>
      </div>
    </div>
  );
}