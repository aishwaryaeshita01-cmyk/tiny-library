import fs from 'fs';
import path from 'path';

const booksPath = path.join(process.cwd(), 'app', 'data', 'books.json');
const books = JSON.parse(fs.readFileSync(booksPath, 'utf8'));

console.log(`🔍 Fetching covers for ${books.length} books...`);

async function updateCovers() {
  for (let i = 0; i < books.length; i++) {
    const book = books[i];
    try {
      const query = encodeURIComponent(`${book.name} ${book.author}`);
      const res = await fetch(`https://openlibrary.org/search.json?q=${query}&limit=1`);
      const data = await res.json();

      if (data.docs && data.docs[0] && data.docs[0].cover_i) {
        const coverId = data.docs[0].cover_i;
        book.coverImage = `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`;
        console.log(`[${i + 1}/${books.length}] ✅ Found cover for: ${book.name}`);
      } else {
        console.log(`[${i + 1}/${books.length}] ⚠️ No cover found for: ${book.name}`);
      }
    } catch (err) {
      console.log(`[${i + 1}/${books.length}] ❌ Error fetching cover for: ${book.name}`);
    }
  }

  fs.writeFileSync(booksPath, JSON.stringify(books, null, 2));
  console.log('\n🎉 Done! books.json updated successfully with cover URLs.');
}

updateCovers();