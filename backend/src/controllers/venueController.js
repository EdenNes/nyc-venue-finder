const { getAllVenues } = require('../services/venueService');

async function listVenues(req, res, next) {
  try {
    const venues = await getAllVenues();
    res.json(venues);
  } catch (err) {
    next(err);
  }
}

module.exports = { listVenues };
