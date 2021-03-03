const express = require('express');
const sensorController = require('../controllers/sensorController');

const router = express.Router();

// get all sensor infos
router.get('/', (req, res, next) => sensorController.showAll(req, res, next));

// get one sensor info
router.get('/:id', (req, res, next) => sensorController.show(req, res, next));

// create one sensor info
router.post('/', (req, res, next) => sensorController.create(req, res, next));

// update one sensor info
router.put('/:id', (req, res, next) => sensorController.update(req, res, next));

// update one sensor state
router.patch('/:id', (req, res, next) =>
  sensorController.updateState(req, res, next)
);

// delete one sensor info
router.delete('/:id', (req, res, next) =>
  sensorController.delete(req, res, next)
);

// delete all sensor info
router.delete('/', (req, res, next) =>
  sensorController.deleteAll(req, res, next)
);

module.exports = router;
