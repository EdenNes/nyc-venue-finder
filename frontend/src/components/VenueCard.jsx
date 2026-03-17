const RANK_COLORS = ['#f5a623', '#9b9b9b', '#cd7f32'];
const RANK_LABELS = ['Best Match', '2nd Pick', '3rd Pick'];

export default function VenueCard({ venue, rank }) {
  const color = RANK_COLORS[rank - 1] || '#ccc';
  const label = RANK_LABELS[rank - 1] || `#${rank}`;

  const features = Array.isArray(venue.features)
    ? venue.features
    : venue.features
      ? venue.features.split(',').map(f => f.trim()).filter(Boolean)
      : [];

  return (
    <div className="venue-card">
      <div className="card-rank" style={{ backgroundColor: color }}>{label}</div>

      <div className="card-body">
        <h3>
          <a
            href={`https://www.google.com/maps/search/${encodeURIComponent(venue.name + ' ' + venue.neighborhood + ' NYC')}`}
            target="_blank"
            rel="noreferrer"
            className="venue-link"
          >
            {venue.name} 🗺️
          </a>
        </h3>
        <p className="card-meta">
          📍 {venue.neighborhood} &nbsp;·&nbsp; 👥 Up to {venue.capacity} guests &nbsp;·&nbsp; 💰 {venue.price_range}
          {venue.min_spend ? ` · Min spend $${Number(venue.min_spend).toLocaleString()}` : ''}
        </p>

        <p className="card-vibe">🎭 {venue.vibe}</p>

        {features.length > 0 && (
          <div className="card-features">
            {features.slice(0, 5).map(f => (
              <span key={f} className="feature-tag">{f}</span>
            ))}
          </div>
        )}

        <div className="card-reason">
          <strong>Why this works:</strong> {venue.reason}
        </div>
      </div>
    </div>
  );
}
