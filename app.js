const express = require('express');
const morgan = require('morgan');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const dotenv = require('dotenv');
const { sequelize } = require('./models');
const authRouter = require('./routes/auth');
const {
  personRouter,
  equipmentRouter,
  sensorRouter,
  messageRouter,
} = require('./routes');

const app = express();

main();

function main() {
  init();

  app.use('/api/auth', authRouter);
  app.use('/api/persons', personRouter);
  app.use('/api/equipments', equipmentRouter);
  app.use('/api/sensors', sensorRouter);
  app.use('/api/messages', messageRouter);

  // 일치하는 라우터가 없을 경우
  app.use((req, res, next) => {
    const error = new Error(`${req.method} ${req.url} : No such router!`);
    error.status = 404;
    next(error);
  });

  // 모든 에러는 이 곳으로 온다
  app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
    console.log(res.locals.message);
    console.log(res.locals.error);
    res.status(err.status || 500);
    res.send(res.locals);
  });

  app.listen(app.get('port'), () => {
    console.log(`Waiting for request in ${app.get('port')} port...`);
  });
}

function init() {
  dotenv.config();

  app.set('port', process.env.PORT || 3000);
  sequelize
    .sync({
      force: false,
    })
    .then(() => {
      console.log('db conneted!');
    })
    .catch((err) => {
      console.error(err);
    });

  app.use(morgan('dev'));
  // app.use(express.static(path.join(__dirname, 'public')));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser(process.env.COOKIE_SECRET));
  app.use(
    session({
      resave: false,
      saveUninitialized: false,
      secret: process.env.COOKIE_SECRET,
      cookie: {
        httpOnly: true,
        secure: false,
      },
      name: 'session-cookie',
    })
  );

  // const fs = require('fs');
  // try {
  //   fs.readdirSync('public');
  // } catch (error) {
  //   console.error('create uploads folder.');
  //   fs.mkdirSync('public');
  // }

  // try {
  //   fs.readdirSync('public/uploads');
  // } catch (error) {
  //   console.error('create public/uploads folder.');
  //   fs.mkdirSync('public/uploads');
  // }

  // try {
  //   fs.readdirSync('public/uploads/images');
  // } catch (error) {
  //   console.error('create public/uploads/images folder.');
  //   fs.mkdirSync('public/uploads/images');
  // }
}
