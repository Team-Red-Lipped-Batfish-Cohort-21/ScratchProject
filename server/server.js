require("dotenv").config();
const express = require("express");
const path = require("path");
const passport = require("passport");
const cookieSession = require("cookie-session");
const cookieParser = require("cookie-parser");
const apiRouter = require("./routes/api");
const authRouter = require("./routes/auth");
const PORT = 3001;
const app = express();
require("./passport-setup");

// handle parsing request body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// // session
// app.use(
//   cookieSession({
//     name: 'session',
//     keys: ['key1', 'key2'],
//   })
// );

// // passport
// app.use(passport.initialize());
// app.use(passport.session());

app.use("/api", apiRouter);

// app.use('/auth', authRouter);

app.use("/build", express.static(path.join(__dirname, "../build")));

app.get("/", (req, res) => {
  return res.sendFile(path.join(__dirname, "../index.html"));
});

app.use("*", (req, res) => {
  res.status(404).send("Not Found");
});

app.use((err, req, res, next) => {
  console.log(err); // err = {message: 'error message'}
  // res.status(500).send("Internal Server Error");
  res.status(500).json(err);
});

app.listen(PORT, console.log(`listening on port ${PORT}`));
