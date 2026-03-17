const { getRecommendations } = require('../services/recommendService');

async function recommend(req, res, next) {
  const { eventType, groupSize, vibe, budget, description } = req.body;

  if (!eventType && !description) {
    return res.status(400).json({ error: 'Please provide at least an event type or description.' });
  }

  try {
    const recommendations = await getRecommendations({ eventType, groupSize, vibe, budget, description });
    res.json({ recommendations });
  } catch (err) {
    next(err);
  }
}

module.exports = { recommend };
