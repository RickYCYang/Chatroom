const express = require('express');
const router = express.Router();

/** services */
const firebaseService = require('../services/firebase');
const userService = require('../services/users');

/** utils */
const logger = require('../utils/logger');

router.get('/', async (req, res) => {
  const { uid } = req;
  try {
    /** find user by uid that came from token */
    const { email, nickname } = await firebaseService.getUser(uid);
    res.json({ email, nickname });
  } catch (error) {
    logger.error(error);
    return res.status(400).json(error);
  }
});

router.get('/all', async (req, res) => {
  try {
    /** find user by uid that came from token */
    const users = userService.getUsers();
    res.json({ users });
  } catch (error) {
    logger.error(error);
    return res.status(400).json(error);
  }
});

module.exports = router;
