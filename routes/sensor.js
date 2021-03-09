const express = require('express');
const sensorController = require('../controllers/sensorController');
const { verifyToken } = require('../middlewares/auth');

const router = express.Router();

// get all sensor states and types
router.get('/list', verifyToken, (req, res, next) =>
  sensorController.showStatesAndTypes(req, res, next)
);

// get all sensor infos
router.get('/', verifyToken, (req, res, next) =>
  sensorController.showAll(req, res, next)
);

// get one sensor info
router.get('/:id', verifyToken, (req, res, next) =>
  sensorController.show(req, res, next)
);

// create one sensor info
router.post('/', verifyToken, (req, res, next) =>
  sensorController.create(req, res, next)
);

// update one sensor info
router.put('/:id', verifyToken, (req, res, next) =>
  sensorController.update(req, res, next)
);

// update one sensor state
router.patch('/:id', verifyToken, (req, res, next) =>
  sensorController.updateState(req, res, next)
);

// delete one sensor info
router.delete('/:id', verifyToken, (req, res, next) =>
  sensorController.delete(req, res, next)
);

module.exports = router;
