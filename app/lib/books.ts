import booksData from "../data/books.json";
import categoriesData from "../data/categories.json";
import { Book, Category, BookCategorySlug } from "../types/tinylibrary";

/**
 * Retrieves all books from local storage.
 */
export async function getAllBooks(): Promise<Book[]> {
  return booksData as Book[];
}

/**
 * Retrieves a single book by its numeric or string ID.
 * Throws an error if no book matches the ID.
 */
export async function getBookById(id: string | number): Promise<Book> {
  const numericId = typeof id === "string" ? parseInt(id, 10) : id;
  const book = (booksData as Book[]).find((b) => b.id === numericId);

  if (!book) {
    throw new Error(`Book with ID ${id} not found.`);
  }

  return book;
}

/**
 * Filters and returns all books belonging to a specific category slug.
 */
export async function getBooksByCategory(categorySlug: BookCategorySlug): Promise<Book[]> {
  return (booksData as Book[]).filter((b) => b.category === categorySlug);
}

/**
 * Retrieves all available book categories.
 */
export async function getAllCategories(): Promise<Category[]> {
  return categoriesData as unknown as Category[];
}

/**
 * Retrieves a single category object by its slug identifier.
 */
export async function getCategoryBySlug(slug: BookCategorySlug): Promise<Category | undefined> {
  return (categoriesData as Category[]).find((cat) => cat.slug === slug);
}

export async function searchBooks(query: string): Promise<Book[]> {
  const allBooks = await getAllBooks();
  const lowerQuery = query.toLowerCase().trim();

  if (!lowerQuery) return allBooks;

  return allBooks.filter(
    (book) =>
      book.name.toLowerCase().includes(lowerQuery) ||
      book.author.toLowerCase().includes(lowerQuery) ||
      book.category.toLowerCase().includes(lowerQuery)
  );
}