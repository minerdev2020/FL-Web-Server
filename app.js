const express = require('express');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const dotenv = require('dotenv');
const { sequelize } = require('./models');
const {
  authRouter,
  logRouter,
  alertRouter,
  personRouter,
  equipmentRouter,
  sensorRouter,
  messageRouter,
  taskRouter,
} = require('./routes');

const app = express();
const webSocket = require('./modules/socket');

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
  app.use(express.static(path.join(__dirname, 'public')));
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

  if (!fs.existsSync(path.join(__dirname, 'logs'))) {
    console.error('create logs folder.');
    fs.mkdirSync(path.join(__dirname, 'logs'));
  }

  if (!fs.existsSync(path.join(__dirname, 'public'))) {
    console.error('create public folder.');
    fs.mkdirSync(path.join(__dirname, 'public'));
  }
}

function main() {
  init();

  app.use('/api/auth', authRouter);
  app.use('/api/logs', logRouter);
  app.use('/api/alerts', alertRouter);
  app.use('/api/persons', personRouter);
  app.use('/api/equipments', equipmentRouter);
  app.use('/api/sensors', sensorRouter);
  app.use('/api/messages', messageRouter);
  app.use('/api/tasks', taskRouter);

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
    res.json({
      code: err.status,
      message: err.message,
    });
  });

  const server = app.listen(app.get('port'), () => {
    console.log(`Waiting for request in ${app.get('port')} port...`);
  });

  webSocket(server, app);
}

main();
