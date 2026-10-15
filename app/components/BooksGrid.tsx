import BookCard from "@/app/components/BookCard";
import { Book } from "@/app/types/tinylibrary";

interface BooksGridProps {
  books: Book[];
}

export default function BooksGrid({ books }: BooksGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
}