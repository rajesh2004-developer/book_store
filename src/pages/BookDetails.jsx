import { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import axios from 'axios';

function BookDetails() {
  const { bookId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [book, setBook] = useState(location.state?.book || null);
  const [loading, setLoading] = useState(!book);

  useEffect(() => {
    if (!book) {
      fetchBookDetails();
    }
  }, [bookId]);

  const fetchBookDetails = async () => {
    try {
      const response = await axios(
        `https://openlibrary.org/works/${bookId}.json`
      );
      const data = await response.data;
      setBook(data);
    } catch (err) {
      console.error('Failed to fetch book details', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (!book) return <div className="container">Book not found</div>;

  const coverUrl = book.cover_i
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
    : null;

  return (
    <div className="container book-details-page">
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <div className="book-details">
        <div className="book-cover-large">
          {coverUrl ? (
            <img src={coverUrl} alt={book.title} />
          ) : (
            <div className="no-cover">No Cover</div>
          )}
        </div>

        <div className="book-info">
          <h1>{book.title}</h1>

          {book.author_name && (
            <p className="author">
              By {book.author_name?.map((a) => a || 'Unknown').join(', ')}
            </p>
          )}

          {book.first_publish_year && (
            <p className="publish-year">Published: {book.first_publish_year}</p>
          )}

          {book.language && (
            <div className="subjects">
              <h3>Languages</h3>
              <div className="subject-tags">
                {book.language.map((subject, index) => (
                  <span key={index} className="tag">
                    {subject}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default BookDetails;
