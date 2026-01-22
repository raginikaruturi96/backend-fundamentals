const express = require('express');
const { body, validationResult } = require('express-validator');
const app = express();

const PORT = 3000;

// Built-in middleware
app.use(express.json());

// Application-level middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

app.use('/customers', require('./routes/customerRoutes'));

// Error-handling middleware (must be last)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error'
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
