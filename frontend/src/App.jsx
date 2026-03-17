import { useState, Component } from 'react';
import SearchForm from './components/SearchForm';
import VenueCard from './components/VenueCard';
import './App.css';

class ErrorBoundary extends Component {
  state = { error: null };
  static getDerivedStateFromError(e) { return { error: e.message }; }
  render() {
    if (this.state.error) return <div className="error" style={{margin:32}}>Something crashed: {this.state.error}</div>;
    return this.props.children;
  }
}

export default function App() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searched, setSearched] = useState(false);

  async function handleSearch(formData) {
    setLoading(true);
    setError('');
    setResults([]);
    setSearched(true);

    try {
      const res = await fetch('http://localhost:3001/api/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setResults(data.recommendations);
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <ErrorBoundary>
    <div className="app">
      <header className="header">
        <h1>🎉 NYC Venue Finder 🎉</h1>
        <p>Describe your event and AI will match you with the perfect spot</p>
      </header>

      <main className="main">
        <SearchForm onSearch={handleSearch} loading={loading} />

        {loading && (
          <div className="loading">
            <div className="spinner" />
            <p>Finding your perfect venues...</p>
          </div>
        )}

        {error && <div className="error">{error}</div>}

        {!loading && results.length > 0 && (
          <section className="results">
            <h2>Top Matches</h2>
            <div className="cards">
              {results.map((venue, i) => (
                <VenueCard key={venue.id} venue={venue} rank={i + 1} />
              ))}
            </div>
          </section>
        )}

        {!loading && searched && results.length === 0 && !error && (
          <div className="empty">No venues found. Try adjusting your search.</div>
        )}
      </main>
    </div>
    </ErrorBoundary>
  );
}
