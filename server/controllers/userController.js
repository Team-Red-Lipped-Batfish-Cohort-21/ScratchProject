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
      // re-hash the password? does bcrypt.compare
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

userController.deleteUser = (req, res, next) => {};

module.exports = userController;
