import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import BookGrid from '../components/BookGrid';
import LoadingSpinner from '../components/LoadingSpinner';
import axios from 'axios';

function Search() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);
  const navigate = useNavigate();

  const handleSearch = async (query) => {
    if (!query.trim()) return;

    setLoading(true);
    setError(null);
    setHasSearched(true);

    try {
      const response = await axios(
        `https://openlibrary.org/search.json?title=${encodeURIComponent(
          query
        )}&limit=20`
      );

      const data = await response.data;

      setBooks(data.docs || []);
    } catch (err) {
      setError('Failed to fetch books. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleBookClick = (book) => {
    // Navigate to book details page
    const bookId = book.key.replace('/works/', '');
    navigate(`/book/${bookId}`, { state: { book } });
  };

  return (
    <div className="container search-page">
      <h1>Search Books</h1>
      <SearchBar onSearch={handleSearch} />

      {loading && <LoadingSpinner />}

      {error && <div className="error-message">{error}</div>}

      {!loading && hasSearched && books.length === 0 && (
        <div className="empty-state">
          <p>No books found. Try a different search term.</p>
        </div>
      )}

      {!loading && books.length > 0 && (
        <>
          <p className="results-count">{books.length} books found</p>
          <BookGrid books={books} onBookClick={handleBookClick} />
        </>
      )}
    </div>
  );
}

export default Search;
