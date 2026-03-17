# NYC Venue Finder

AI-powered venue recommendation app for NYC events. Describe your event and Claude AI matches you with the perfect spot from a curated list of 15 NYC venues.

## Tech Stack

- **Frontend:** React + Vite
- **Backend:** Node.js + Express
- **Database:** PostgreSQL
- **AI:** Anthropic Claude API

## Features

- Search by event type, group size, vibe, and budget
- AI-powered recommendations with personalized reasoning
- Google Maps links for each venue
- 15 curated NYC venues across all neighborhoods

## Running Locally

### Prerequisites
- Node.js
- PostgreSQL
- Anthropic API key

### Setup

```bash
# Backend
cd backend
npm install
# Create .env with DATABASE_URL and ANTHROPIC_API_KEY
node index.js

# Frontend
cd frontend
npm install
npm run dev
```

Open http://localhost:5173
