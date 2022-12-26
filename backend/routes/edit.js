const express = require('express');
const router = express.Router();

/** service */
const firebaseService = require('../services/firebase');
const userService = require('../services/users');

/** utils */
const logger = require('../utils/logger');

router.patch('/', async (req, res) => {
  const { nickname } = req.body;
  const { uid } = req;
  logger.info('uid:', uid);
  logger.info('nickname:', nickname);

  if (!nickname) {
    return res.status(422).json({
      message: 'field nickname not found',
    });
  }

  try {
    await firebaseService.updateNickname(uid, nickname);
    userService.updateUserNickname(uid, nickname);
    //logger.info(userService.getUsers());

    res.send({
      uid,
      nickname,
    });
  } catch (error) {
    logger.info(error);
    return res.status(400).json(error);
  }
});

module.exports = router;
