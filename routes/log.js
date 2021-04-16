const express = require('express');
const { User } = require('../models');
const loginLog = require('../modules/loginLog');

const router = express.Router();

router.get('/login/:id', async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { person_id: req.params.id } });
    if (user) {
      const logs = await loginLog.readLog(user);
      return res.status(200).json({
        code: 200,
        message: 'Succeeded!',
        data: logs.toString(),
      });
    }
    return res.status(404).json({
      code: 404,
      message: "failed! such user doesn't exist!",
    });
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

module.exports = router;
