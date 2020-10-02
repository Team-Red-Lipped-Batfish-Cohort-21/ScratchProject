const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

mongoose
  .connect(process.env.MONGO_URI, {
    usedNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    dbName: "cardgame",
  })
  .then(() => console.log("Connected to Mongo DB"))
  .catch((err) => console.log(err));
