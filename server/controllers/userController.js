const bcrypt = require('bcrypt');
const User = require('../models/userModel');

const userController = {};

userController.createUser = (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password)
    return next({ message: 'Missing username/password' });

  User.create({ username, password }, (err, user) => {
    if (err) {
      console.log('database error', err);
      return next({
        message: `Error in userController.createUser database error ${JSON.stringify(
          err
        )}`,
      });
    }
    res.locals.user = user;
    return next();
  });
};

userController.verifyUser = (req, res, next) => {
  const { username, password } = req.body;

  try {
    if (!username || !password)
      return next({ message: 'Missing username/password' });

    User.findOne({ username }, (err, foundUser) => {
      if (err) {
        return next({
          message: `Error in userController.verifylUsers ${JSON.stringify(
            err
          )}`,
        });
      }
      bcrypt.compare(password, foundUser.password, (err, passwordMatches) => {
        if (passwordMatches) {
          res.locals.user = foundUser;
          return next();
        }
        return next({ message: `Error: Username ${username} not found` });
      });
    });
  } catch (err) {
    return next(err);
  }
};

userController.updateRecord = (req, res, next) => {
  const { username, bestRecord, played } = req.body.user;
  const { clickCount } = req.body;

  let newRecord;

  if (bestRecord) {
    newRecord = Math.min(clickCount, bestRecord);
  } else newRecord = clickCount;

  const update = {
    username,
    bestRecord: newRecord,
    played: played + 1,
  };

  User.findOneAndUpdate({ username }, update, { new: true }, (err, updated) => {
    if (err) {
      return next({
        message: `Error in userController.updateRecord ${JSON.stringify(err)}`,
      });
    } else if (updated) {
      console.log('updated user from db', updated);
      res.locals.user = updated;
      return next();
    } else {
      return next({ message: `Error: Username ${username} not found` });
    }
  });
};

module.exports = userController;
