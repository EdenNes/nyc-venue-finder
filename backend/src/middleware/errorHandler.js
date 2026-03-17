function errorHandler(err, req, res, next) {
  console.error(`[error] ${req.method} ${req.path} —`, err.message);
  res.status(500).json({ error: err.message || 'Internal server error' });
}

module.exports = errorHandler;
