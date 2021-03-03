const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const Person = require('../models/person');

const router = express.Router();

router.post('/login', async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { user_id: req.body.user_id } });
    if (user) {
      if (bcrypt.compareSync(req.body.user_pw, user.user_pw)) {
        await Person.update({ state_id: 1 }, { where: { id: user.person_id } });

        return res.json({ message: 'login succeeded!', result: 101 });
      } else {
        return res.json({
          message: 'login failed! password is wrong!',
          result: 102,
        });
      }
    } else {
      return res.json({
        message: "login failed! such user doesn't exist!",
        result: 103,
      });
    }
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

router.get('/logout', async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { user_id: req.body.user_id } });
    if (user) {
      await Person.update({ state_id: 2 }, { where: { id: user.person_id } });

      return res.json({ message: 'logout succeeded!', result: 301 });
    } else {
      return res.json({
        message: "logout failed! such user doesn't exist!",
        result: 302,
      });
    }
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

router.post('/register', async (req, res, next) => {
  try {
    const exUser = await User.findOne({ where: { user_id: req.body.user_id } });
    if (exUser) {
      return res.json({ message: 'register failed!', result: 202 });
    }

    const hash = await bcrypt.hash(req.body.user_pw, 12);
    const person = await Person.create({
      name: req.body.name,
      phone: req.body.phone,
      state_id: 2,
      type_id: 1,
    });
    await User.create({
      user_id: req.body.user_id,
      user_pw: hash,
      person_id: person.id,
    });
    return res.json({ message: 'register succeeded!', result: 201 });
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

module.exports = router;
