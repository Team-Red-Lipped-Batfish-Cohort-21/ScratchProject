require('dotenv').config();
const express = require('express');
const path = require('path');
const PORT = 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// for signin --> create a router folder and invoke the midware thats gonna do all the chks, bcyrpt,..
// app.use('/', require("../routes/userRouter"));

app.post('/api/login', (req, res) => {
  if (!req.body.username || !req.body.password) {
    res.status(200).json({ message: 'missing info' });
  }
  console.log('req.body in post', req.body);
  res.status(200).json({ username: req.body.username, highscore: 2 });
});

app.use('/build', express.static(path.join(__dirname, '../build')));

app.get('/', (req, res) => {
  return res.sendFile(path.join(__dirname, '../index.html'));
});

app.listen(PORT, console.log(`listening on port ${PORT}`));
