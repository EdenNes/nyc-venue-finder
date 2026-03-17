const Anthropic = require('@anthropic-ai/sdk');
const { getAllVenues } = require('./venueService');

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

async function getRecommendations({ eventType, groupSize, vibe, budget, description }) {
  const venues = await getAllVenues();

  const venueList = venues.map(v =>
    `ID: ${v.id} | Name: ${v.name} | Neighborhood: ${v.neighborhood} | Capacity: ${v.capacity} | Vibe: ${v.vibe} | Price: ${v.priceRange} | Min Spend: $${v.minSpend} | Features: ${v.features}`
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
- priceRange
- minSpend
- features
- reason (1-2 sentences explaining exactly why this venue fits their event)

Return ONLY a valid JSON array, no other text.`;

  const message = await client.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 1024,
    messages: [{ role: 'user', content: prompt }],
  });

  let raw = message.content[0].text.trim();
  raw = raw.replace(/^```json\s*/i, '').replace(/^```\s*/i, '').replace(/```\s*$/i, '').trim();

  return JSON.parse(raw);
}

module.exports = { getRecommendations };
