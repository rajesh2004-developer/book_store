function BookCard({ book, onClick }) {
  const coverUrl = book.cover_i
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
    : null;

  const author = book.author_name ? book.author_name[0] : 'Unknown Author';

  const year = book.first_publish_year || 'N/A';

  const handleRemoveClick = (e) => {
    e.stopPropagation();
    onRemove(book.key);
  };

  return (
    <div className="book-card" onClick={() => onClick(book)}>
      <div className="book-cover">
        {coverUrl ? (
          <img src={coverUrl} alt={book.title} />
        ) : (
          <div className="no-cover">📚</div>
        )}
      </div>

      <div className="book-card-info">
        <h3 className="book-title">{book.title}</h3>
        <p className="book-author">{author}</p>
        <p className="book-year">{year}</p>
      </div>
    </div>
  );
}

export default BookCard;
