const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');
const bcrypt = require('bcrypt');

mongoose
  .connect(process.env.MONGO_URI, {
    usedNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    dbName: 'cardgame',
  })
  .then(() => console.log('Connected to Mongo DB'))
  .catch((err) => console.log(err));

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    min: 4,
    max: 12,
  },
  password: {
    type: String,
    required: true,
  },
  bestrecord: Number,
  played: Number,
});

const SALT_WORK_FACTOR = 10;
// not using arrow function so that we can have access to 'this'
// bcrypt.genSalt?
userSchema.pre('save', function (next) {
  if (!this.isModified('password')) return next();
  bcrypt.hash(this.password, SALT_WORK_FACTOR, (err, passwordHash) => {
    if (err) return next(err);
    this.password = passwordHash;
    next();
  });
});

const User = mongoose.model('User', userSchema);

module.exports = {
  User,
};
