const express = require('express');
const cors = require('cors');
require('dotenv').config();

const venuesRouter = require('./routes/venues');
const recommendRouter = require('./routes/recommend');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use('/api/venues', venuesRouter);
app.use('/api/recommend', recommendRouter);

app.listen(PORT, () => {
  console.log(`[server] Running on http://localhost:${PORT}`);
});
