const express = require('express');
const router = express.Router();
const db = require('../db');
const Anthropic = require('@anthropic-ai/sdk');
require('dotenv').config();

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

// POST /api/recommend
// Body: { eventType, groupSize, vibe, budget, description }
router.post('/', async (req, res) => {
  const { eventType, groupSize, vibe, budget, description } = req.body;

  if (!description && !eventType) {
    return res.status(400).json({ error: 'Please provide at least an event type or description.' });
  }

  try {
    // Fetch all venues from DB
    const result = await db.query('SELECT * FROM venues ORDER BY name');
    const venues = result.rows;

    const venueList = venues.map(v =>
      `ID: ${v.id} | Name: ${v.name} | Neighborhood: ${v.neighborhood} | Capacity: ${v.capacity} | Vibe: ${v.vibe} | Price: ${v.price_range} | Min Spend: $${v.min_spend} | Features: ${v.features}`
    ).join('\n');

    const prompt = `You are a NYC venue expert helping someone find the perfect spot for their event.

Here are the available venues:
${venueList}

The user is planning:
- Event type: ${eventType || 'Not specified'}
- Group size: ${groupSize || 'Not specified'}
- Vibe they want: ${vibe || 'Not specified'}
- Budget: ${budget || 'Not specified'}
- Additional details: ${description || 'None'}

Return the top 3 best venue matches as a JSON array. For each venue include:
- id (the venue ID)
- name
- neighborhood
- capacity
- vibe
- price_range
- min_spend
- features
- reason (1-2 sentences explaining exactly why this venue fits their event)

Return ONLY a valid JSON array, no other text.`;

    const message = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 1024,
      messages: [{ role: 'user', content: prompt }],
    });

    let raw = message.content[0].text.trim();
    // Strip markdown code fences if Claude wrapped the JSON
    raw = raw.replace(/^```json\s*/i, '').replace(/^```\s*/i, '').replace(/```\s*$/i, '').trim();
    const recommendations = JSON.parse(raw);
    res.json({ recommendations });
  } catch (err) {
    console.error('[recommend] Error:', err.message);
    res.status(500).json({ error: 'Failed to get recommendations' });
  }
});

module.exports = router;
