const User = require('../models/userModel');

const getLeaderBoard = (req, res, next) => {
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
      }
      // else if (result) {
      res.locals.bestRecords = result; // an array of objects [ {username, bestRecord}, ... ]
      // console.log('from getLeaderBoard', res.locals.bestRecords);
      return next();
    });
};

const getMostPlayed = (req, res, next) => {
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
      }
      res.locals.mostPlayed = result2; // an array of objects [ {username, played}, ... ]
      // console.log('getMostPlayed', res.locals.mostPlayed);
      return next();
    });
};

module.exports = [getLeaderBoard, getMostPlayed];
