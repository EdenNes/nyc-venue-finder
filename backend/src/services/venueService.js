const prisma = require('../lib/prisma');

async function getAllVenues() {
  return prisma.venue.findMany({ orderBy: { name: 'asc' } });
}

module.exports = { getAllVenues };
