const express = require('express');
const jwt = require('jsonwebtoken');
const { verifyToken } = require('./middlewares');
const { User } = require('../models');

const router = express.Router();

router.post('/token', async (req, res) => {
  const { clientSecret } = req.body;
  try {
    const token = jwt.sign(
      {
        id: 1,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '1m',
        issuer: 'flserver',
      }
    );
    return res.status(200).json({
      code: 200,
      message: 'token has been issued',
      token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      code: 500,
      message: 'server error!',
    });
  }
});

router.get('/test', verifyToken, (req, res) => {
  req.json(req.decoded);
});

module.exports = router;
