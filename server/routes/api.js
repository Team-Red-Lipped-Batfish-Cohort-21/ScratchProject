const express = require('express');
const userController = require('../controllers/userController');
const gameController = require('../controllers/gameController');
const router = express.Router();

// If user logs in, we set a cookie for the userID
//

router.post('/login', userController.verifyUser, gameController, (req, res) => {
  console.log(`returning a POST req to '/api/login' endpoint`);
  const { username, played, bestRecord = null } = res.locals.user;
  // const bestRecord = res.locals.user.bestRecord || null;

  const user = { username, bestRecord, played };
  const leaderBoard = {
    bestRecords: res.locals.bestRecords,
    mostPlayed: res.locals.mostPlayed,
  };

  res.status(200).json({ user, leaderBoard });
});

router.post(
  '/signup',
  userController.createUser,
  gameController,
  (req, res) => {
    console.log(`returning a POST req to '/api/signup' endpoint`);
    const { username, played, bestRecord = null } = res.locals.user;
    const user = { username, bestRecord, played };
    const leaderBoard = {
      bestRecords: res.locals.bestRecords,
      mostPlayed: res.locals.mostPlayed,
    };

    res.status(200).json({ user, leaderBoard });
  }
);

router.put(
  '/update',
  userController.updateRecord,
  gameController,
  (req, res) => {
    console.log(`returning a PUT req to '/api/update endpoint`);
    const { username, played, bestRecord = null } = res.locals.user;
    // const bestRecord = res.locals.user.bestRecord || null;
    const user = { username, bestRecord, played };
    const leaderBoard = {
      bestRecords: res.locals.bestRecords,
      mostPlayed: res.locals.mostPlayed,
    };
    res.status(200).json({ user, leaderBoard });
  }
);

// router.delete("/delete", userController.deleteUser, (req, res) => {
//   console.log(`returning a DELETE req to '/api/delete' endpoint`);
//   const { username, played } = res.locals.user;
//   const bestRecord = res.locals.user.bestRecord || null;
//   res.status(200).json({ username, bestRecord, played });
// });

module.exports = router;
