import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="container home-page">
      <div className="hero-section">
        <h1>Welcome to Book Finder</h1>
        <p>Search millions of books from Open Library</p>
        <button className="primary-btn" onClick={() => navigate('/search')}>
          Start Searching
        </button>
      </div>

      <div className="features">
        <div className="feature-card">
          <span className="feature-icon">🔍</span>
          <h3>Search Books</h3>
          <p>Find books by title, author, or ISBN</p>
        </div>
        <div className="feature-card">
          <span className="feature-icon">💾</span>
          <h3>Save Favorites</h3>
          <p>Keep track of books you want to read</p>
        </div>
        <div className="feature-card">
          <span className="feature-icon">📖</span>
          <h3>Detailed Info</h3>
          <p>View complete book information</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
