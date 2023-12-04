const express = require('express');
const morgan = require('morgan'); // Import Morgan
const bodyParser = require('body-parser');
const authRoutes = require('./routes/userRoute');
const budgetRoutes = require('./routes/budgetRoute');
const { authenticateToken } = require('./middlewares/authMiddleware');
const expenseRoutes = require('./routes/expenseRoute');
const mongoose = require('./config/database'); // Import the configured mongoose instance
const dotenv = require('dotenv');
const e = require('express');
const app = express();
const port = 3000;

dotenv.config();
app.use(morgan('dev'));
// Middleware to parse JSON data
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/',authenticateToken,budgetRoutes);
app.use('/api/',authenticateToken,expenseRoutes);

// 404 Error Handler
app.use((req, res, next) => {
    res.status(404).json({ error: 'Not Found' });
  });
  
  // Global Error Handler
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
  });

// Start the server
app.listen(port, () => {
  console.log(`Expense and Budget Calculator app listening at http://localhost:${port}`);
});