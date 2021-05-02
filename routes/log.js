const express = require('express');
const { User } = require('../models');
const loginLog = require('../modules/loginLog');

const router = express.Router();

router.get('/login/:id', async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { person_id: req.params.id } });
    if (user) {
      try {
        const logs = await loginLog.readLog(user);
        return res.status(200).json({
          code: 200,
          message: 'Succeeded!',
          data: logs.toString(),
        });
      } catch (err) {
        console.error(err);
        return res.status(404).json({
          code: 404,
          message: "failed! such user's login log file doesn't exist!",
        });
      }
    }
    return res.status(404).json({
      code: 404,
      message: "failed! such user doesn't exist!",
    });
  } catch (err) {
    console.error(err);
    return next(err);
  }
});

module.exports = router;
