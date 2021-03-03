const express = require('express');
const messageController = require('../controllers/messageController');

const router = express.Router();

// get all message infos
router.get('/', (req, res, next) => messageController.showAll(req, res, next));

// get one message info
router.get('/:id', (req, res, next) => messageController.show(req, res, next));

// create one message info
router.post('/', (req, res, next) => messageController.create(req, res, next));

// update one message info
router.put('/:id', (req, res, next) =>
  messageController.update(req, res, next)
);

// update one message state
router.patch('/:id', (req, res, next) =>
  messageController.updateState(req, res, next)
);

// delete one message info
router.delete('/:id', (req, res, next) =>
  messageController.delete(req, res, next)
);

// delete all message info
router.delete('/', (req, res, next) =>
  messageController.deleteAll(req, res, next)
);

module.exports = router;
