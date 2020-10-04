const { response } = require('express');
const User = require('./userModel');

const userController = {};

userController.verifyUser = (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password)
    return next({ message: 'Missing username/password' });
  User.findOne({ username }, (err, foundUser) => {
    if (err)
      return next({
        message: `Error in userController.getAllUsers ${JSON.stringify(err)}`,
      });
    else if (foundUser) {
      // re-hash the password? does bcrypt.compare
      bcrypt.compare(password, foundUser.password, (err, result) => {
        if (result === true) {
          res.locals.user = foundUser;
          console.log('foundUser is', foundUser);
          return next();
        }
      });
    } else {
      return next({ message: `Error: Username ${username} not found` });
    }
  });
};
