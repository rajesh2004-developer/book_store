import { BrowserRouter, Routes, Route, Link, NavLink } from 'react-router-dom';
import './App.css';

// page components
import Home from './pages/Home';
import Search from './pages/Search';
import BookDetails from './pages/BookDetails';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        {/* Navigation Header */}
        <header className="app-header">
          <div className="container">
            <Link to="/" className="logo">
              📚 Book Finder
            </Link>

            <nav className="main-nav">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? 'nav-link active' : 'nav-link'
                }
                end
              >
                Home
              </NavLink>
              <NavLink
                to="/search"
                className={({ isActive }) =>
                  isActive ? 'nav-link active' : 'nav-link'
                }
              >
                Search
              </NavLink>
            </nav>
          </div>
        </header>

        {/* Main Content */}
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            {/* <Route path="/my-books" element={<MyBooks />} /> */}
            <Route path="/book/:bookId" element={<BookDetails />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

function NotFound() {
  return (
    <div className="not-found">
      <h1>404</h1>
      <p>Page not found</p>
      <Link to="/">Go back home</Link>
    </div>
  );
}

export default App;
