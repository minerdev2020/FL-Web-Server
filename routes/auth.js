const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const Person = require('../models/person');
const { sign } = require('../modules/v1');

const router = express.Router();

router.post('/login', async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { user_id: req.body.user_id } });
    if (user) {
      if (bcrypt.compareSync(req.body.user_pw, user.user_pw)) {
        const person = await Person.findOne({ where: { id: user.person_id } });
        if (person.state_id == 2) {
          return res.json({
            code: 401,
            message: 'login failed! you have already logged-in!',
          });
        }

        await User.update(
          { ip: req.ip.split(':').pop() },
          { where: { id: user.id } }
        );
        await Person.update({ state_id: 2 }, { where: { id: user.person_id } });
        console.log(`client ip : ${req.ip}`);
        return res.json({
          code: 200,
          message: 'login succeeded!',
          token: sign(user),
        });
      } else {
        return res.json({
          code: 400,
          message: 'login failed! password is wrong!',
        });
      }
    } else {
      return res.json({
        code: 404,
        message: "login failed! such user doesn't exist!",
      });
    }
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

router.post('/logout', async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { user_id: req.body.user_id } });
    if (user) {
      const person = await Person.findOne({ where: { id: user.person_id } });
      if (person.state_id == 1) {
        return res.json({
          code: 401,
          message: 'logout failed! you have already logged-out!',
        });
      }

      await Person.update({ state_id: 1 }, { where: { id: user.person_id } });

      return res.json({
        code: 200,
        message: 'logout succeeded!',
      });
    } else {
      return res.json({
        code: 404,
        message: "logout failed! such user doesn't exist!",
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
      return res.json({
        code: 409,
        message: 'register failed! such user have already existed!',
      });
    }

    const hash = await bcrypt.hash(req.body.user_pw, 12);
    const person = await Person.create({
      name: req.body.name,
      phone: req.body.phone,
      state_id: 1,
      type_id: req.body.type_id,
    });
    await User.create({
      user_id: req.body.user_id,
      user_pw: hash,
      person_id: person.id,
    });
    return res.json({
      code: 201,
      message: 'register succeeded!',
    });
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

module.exports = router;
