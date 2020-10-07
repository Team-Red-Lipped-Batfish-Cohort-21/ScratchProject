require('dotenv').config();
const express = require('express');
const path = require('path');
const PORT = 3000;

const app = express();
const cookieParser = require('cookie-parser');
const apiRouter = require('./routes/api');

/**
 * Express middlewares
 */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api', apiRouter);

/**
 * Serve static files
 */
app.use('/build', express.static(path.join(__dirname, '../build')));

/**
 * Serve home page
 */
app.get('/', (req, res) => {
  return res.sendFile(path.join(__dirname, '../index.html'));
});

/**
 * 404 not found
 */
app.use('*', (req, res) => {
  res.status(404).send('Not Found');
});

/**
 * Global error handler
 */
app.use((err, req, res, next) => {
  res.status(500).json({ err: err.message.toString() });
});

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
