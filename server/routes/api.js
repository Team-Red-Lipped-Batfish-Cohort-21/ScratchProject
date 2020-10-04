const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

router.post('/login', userController.verifyUser, (req, res) => {
  console.log(`returning a POST req to '/api/login' endpoint`);
  const { username, played } = res.locals.user;
  const bestRecord = res.locals.user.bestRecord || null;
  res.status(200).json({ username, bestRecord, played });
});

router.post('/signup', userController.createUser, (req, res) => {
  console.log(`returning a POST req to '/api/signup' endpoint`);
  const { username, played } = res.locals.user;
  const bestRecord = res.locals.user.bestRecord || null;
  res.status(200).json({ username, bestRecord, played });
});

router.delete('/delete', userController.deleteUser, (req, res) => {
  console.log(`returning a DELETE req to '/api/delete' endpoint`);
  const { username, played } = res.locals.user;
  const bestRecord = res.locals.user.bestRecord || null;
  res.status(200).json({ username, bestRecord, played });
});

module.exports = router;
