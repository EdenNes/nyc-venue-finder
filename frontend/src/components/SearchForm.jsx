import { useState } from 'react';

const EVENT_TYPES = ['Birthday Party', 'Bachelor/Bachelorette', 'Corporate Event', 'Date Night', 'Holiday Party', 'Casual Hangout', 'Celebration', 'Other'];
const VIBES = ['Rooftop', 'Speakeasy / Intimate', 'Nightclub / Dancing', 'Sports Bar', 'Upscale / Fine Dining', 'Fun / Unique', 'Waterfront', 'Chill / Low-key'];
const BUDGETS = ['Under $500', '$500–$1,000', '$1,000–$2,500', '$2,500–$5,000', '$5,000+'];

export default function SearchForm({ onSearch, loading }) {
  const [form, setForm] = useState({
    eventType: '',
    groupSize: '',
    vibe: '',
    budget: '',
    description: '',
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSearch(form);
  }

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="form-group">
          <label>Event Type</label>
          <select name="eventType" value={form.eventType} onChange={handleChange}>
            <option value="">Select type...</option>
            {EVENT_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>

        <div className="form-group">
          <label>Group Size</label>
          <input
            type="number"
            name="groupSize"
            placeholder="e.g. 25"
            value={form.groupSize}
            onChange={handleChange}
            min="1"
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Vibe</label>
          <select name="vibe" value={form.vibe} onChange={handleChange}>
            <option value="">Select vibe...</option>
            {VIBES.map(v => <option key={v} value={v}>{v}</option>)}
          </select>
        </div>

        <div className="form-group">
          <label>Budget</label>
          <select name="budget" value={form.budget} onChange={handleChange}>
            <option value="">Select budget...</option>
            {BUDGETS.map(b => <option key={b} value={b}>{b}</option>)}
          </select>
        </div>
      </div>

      <div className="form-group full">
        <label>Tell us more <span className="hint">(optional — the more detail, the better)</span></label>
        <textarea
          name="description"
          placeholder="e.g. It's my friend's 25th birthday, she loves rooftops and dancing. We want bottle service if possible."
          value={form.description}
          onChange={handleChange}
          rows={3}
        />
      </div>

      <button type="submit" className="submit-btn" disabled={loading || (!form.eventType && !form.description)}>
        {loading ? 'Searching...' : 'Find Venues ✨'}
      </button>
    </form>
  );
}
