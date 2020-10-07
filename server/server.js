require('dotenv').config();
const express = require('express');
const path = require('path');
const PORT = 3000;

const app = express();
const cookieParser = require('cookie-parser');
const apiRouter = require('./routes/api');

// const session = require('express-session')

// 8080 -> devSever and it serves the index.html -> contains react / react router
// 3000 -> '/', serves index.html
// 3000/game ->

// mongo "mongodb+srv://cluster0.bepyw.mongodb.net/cardgame" --username BargeLeveler7
// codesmithMongoDB
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
// app.get('/', (req, res) => {
//   return res.status(200).sendFile(path.join(__dirname, '../index.html'));
// });

// app.use('*', (req, res) => {
//   // res.status(404).send('Not Found');
//   return res.status(200).sendFile(path.join(__dirname, '../index.html'));
// });

/**
 * Global error handler
 */
app.use((err, req, res, next) => {
  res.status(500).json({ err: err.message.toString() });
});

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
