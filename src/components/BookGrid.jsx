import BookCard from './BookCard';

function BookGrid({ books, onBookClick }) {
  return (
    <div className="book-grid">
      {books.map((book, index) => (
        <BookCard key={book.key || index} book={book} onClick={onBookClick} />
      ))}
    </div>
  );
}

export default BookGrid;
