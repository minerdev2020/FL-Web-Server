const express = require('express');
const alertController = require('../controllers/alertController');
const { verifyToken } = require('../middlewares/auth');

const router = express.Router();

// get all alert states and types
router.get('/list', verifyToken, (req, res, next) =>
  alertController.showStatesAndTypes(req, res, next)
);

// get all alert infos
router.get('/', verifyToken, (req, res, next) =>
  alertController.showAll(req, res, next)
);

// get one alert info
router.get('/:id', verifyToken, (req, res, next) =>
  alertController.show(req, res, next)
);

// create one alert info
router.post('/', verifyToken, (req, res, next) =>
  alertController.create(req, res, next)
);

// update one alert info
router.put('/:id', verifyToken, (req, res, next) =>
  alertController.update(req, res, next)
);

// update one alert state
router.patch('/:id', verifyToken, (req, res, next) =>
  alertController.updateState(req, res, next)
);

// delete one alert info
router.delete('/:id', verifyToken, (req, res, next) =>
  alertController.delete(req, res, next)
);

module.exports = router;
