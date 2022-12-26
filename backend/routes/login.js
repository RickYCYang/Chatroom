const express = require('express');
const router = express.Router();

/* utils */
const logger = require('../utils/logger');
const { signJwt } = require('../utils/jwt');

/** service */
const firebaseService = require('../services/firebase');

const cookieExpireTimes = 24 * 60 * 60 * 1000; // mileseconds

router.post('/', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(401);

  try {
    /** authentication by firebase */
    const uid = await firebaseService.signIn(email, password);
    /** nickname by uid */
    const { nickname } = await firebaseService.getUser(uid);
    const user = {
      nickname,
      uid,
    };

    /* Sign JWT token */
    const token = signJwt(user, cookieExpireTimes);

    /* Set http-only cookie  */
    res.cookie('token', token, {
      maxAge: cookieExpireTimes,
      httpOnly: true,
    });

    res.json({
      ...user,
      token,
    });
  } catch (error) {
    logger.info(error);
    return res.status(401).json(error);
  }
});

module.exports = router;
