const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

router.post(
  '/login',
  userController.verifyUser,
  userController.getLeaderBoard,
  (req, res) => {
    console.log(`returning a POST req to '/api/login' endpoint`);
    const { username, played } = res.locals.user;
    const bestRecord = res.locals.user.bestRecord || null;
    const user = { username, bestRecord, played };
    const { bestRecords, mostPlayed } = res.locals;
    const leaderBoard = { bestRecords, mostPlayed };
    res.status(200).json({ user, leaderBoard });
    // const bestRecords = res.locals.bestRecords;
    // const mostPlayed = res.locals.mostPlayed;
    // console.log("leaderBoard in server before return", leaderBoard);
  }
);

router.post(
  '/signup',
  userController.createUser,
  userController.getLeaderBoard,
  (req, res) => {
    console.log(`returning a POST req to '/api/signup' endpoint`);
    // const { username, played } = res.locals.user;
    // const bestRecord = res.locals.user.bestRecord || null;
    // res.status(200).json({ username, bestRecord, played });
    const { username, played } = res.locals.user;
    const bestRecord = res.locals.user.bestRecord || null;
    const user = { username, bestRecord, played };
    const { bestRecords, mostPlayed } = res.locals;
    const leaderBoard = { bestRecords, mostPlayed };
    res.status(200).json({ user, leaderBoard });
  }
);

router.put(
  '/update',
  userController.updateRecord,
  userController.getLeaderBoard,
  (req, res) => {
    console.log(`returning a PUT req to '/api/update endpoint`);
    // const { username, played, bestRecord } = res.locals.user;
    // res.status(200).json({ username, bestRecord, played });
    const { username, played } = res.locals.user;
    const bestRecord = res.locals.user.bestRecord || null;
    const user = { username, bestRecord, played };
    const { bestRecords, mostPlayed } = res.locals;
    const leaderBoard = { bestRecords, mostPlayed };
    const update = { user, leaderBoard };
    // console.log('sending back update', update);
    res.status(200).json(update);
  }
);

// router.delete("/delete", userController.deleteUser, (req, res) => {
//   console.log(`returning a DELETE req to '/api/delete' endpoint`);
//   const { username, played } = res.locals.user;
//   const bestRecord = res.locals.user.bestRecord || null;
//   res.status(200).json({ username, bestRecord, played });
// });

module.exports = router;
