const User = require('../models/userModel');
const bcrypt = require('bcrypt');

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
    } else {
      res.locals.user = user;
      return next();
    }
  });
};

userController.verifyUser = (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password)
    return next({ message: 'Missing username/password' });
  User.findOne({ username }, (err, foundUser) => {
    if (err) {
      return next({
        message: `Error in userController.verifylUsers ${JSON.stringify(err)}`,
      });
    } else if (foundUser) {
      bcrypt.compare(password, foundUser.password, (err, result) => {
        if (result === true) {
          res.locals.user = foundUser;
          return next();
        }
      });
    } else {
      return next({ message: `Error: Username ${username} not found` });
    }
  });
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

userController.getLeaderBoard = (req, res, next) => {
  User.find({ bestRecord: { $ne: null } })
    .limit(4)
    .sort('bestRecord')
    .select('username bestRecord')
    .exec((err, result) => {
      if (err) {
        return next({
          message: `Error in userController.getLeaderBoard ${JSON.stringify(
            err
          )}`,
        });
      } else if (result) {
        res.locals.bestRecords = result; // an array of objects [ {username, bestRecord}, ... ]
        User.find()
          .limit(4)
          .sort('-played')
          .select('username played')
          .exec((err, result2) => {
            if (err) {
              return next({
                message: `Error in userController.getLeaderBoard ${JSON.stringify(
                  err
                )}`,
              });
            } else if (result2) {
              res.locals.mostPlayed = result2; // an array of objects [ {username, played}, ... ]
              return next();
            } else return next({ message: `no result somehow` });
          });
      } else return next({ message: `no result somehow` });
    });
};

// userController.deleteUser = (req, res, next) => {};

module.exports = userController;
