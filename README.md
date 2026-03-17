# NYC Venue Finder

AI-powered venue recommendation app for NYC events. Describe your event and Claude AI matches you with the perfect spot from a curated list of 15 NYC venues.

## Tech Stack

- **Frontend:** React + Vite
- **Backend:** Node.js + Express
- **ORM:** Prisma (with `@prisma/adapter-pg`)
- **Database:** PostgreSQL
- **AI:** Anthropic Claude API (claude-haiku)

## Features

- Search by event type, group size, vibe, and budget
- AI-powered recommendations with personalized reasoning for each match
- Google Maps links for every venue
- 15 curated NYC venues across all neighborhoods

## Project Structure

```
backend/
  src/
    controllers/    # Handle req/res, delegate to services
    services/       # Business logic — Prisma queries & AI calls
    routes/         # URL routing
    middleware/     # Global error handler
    lib/            # Prisma client singleton
  prisma/
    schema.prisma   # Venue model
  index.js          # Express entry point
frontend/
  src/
    components/     # SearchForm, VenueCard
    App.jsx
```

## Running Locally

### Prerequisites
- Node.js
- PostgreSQL
- Anthropic API key

### Backend Setup

```bash
cd backend
npm install
npx prisma generate
```

Create a `.env` file in `backend/`:
```
DATABASE_URL=postgresql://localhost/venuedb
ANTHROPIC_API_KEY=your_key_here
PORT=3001
```

Seed the database then start the server:
```bash
node index.js
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Open **http://localhost:5173**
