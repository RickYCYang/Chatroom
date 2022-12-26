const express = require('express');
const router = express.Router();

/** utils */
const logger = require('../utils/logger');

/** service */
const firebaseService = require('../services/firebase');
const userService = require('../services/users');

router.post('/', async (req, res) => {
  const { email, password, nickname } = req.body;
  if (!email || !password || !nickname) {
    return res.status(422).json({
      message: 'missing fields',
    });
  }
  try {
    const uid = await firebaseService.signUp(email, password);
    await firebaseService.saveUser(email, password, nickname, uid);
    userService.addUser(uid, nickname);
    //logger.info(userService.getUsers());

    return res.json({
      uid,
    });
  } catch (error) {
    logger.info(error);
    res.status(422).json(error);
  }
});

module.exports = router;
