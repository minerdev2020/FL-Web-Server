const express = require('express');
const messageController = require('../controllers/messageController');
const { verifyToken } = require('../middlewares/auth');

const router = express.Router();

// get all message states and types
router.get('/list', verifyToken, (req, res, next) =>
  messageController.showStatesAndTypes(req, res, next)
);

// get all message infos
router.get('/', verifyToken, (req, res, next) =>
  messageController.showAll(req, res, next)
);

// get one message info
router.get('/:id', verifyToken, (req, res, next) =>
  messageController.show(req, res, next)
);

// create one message info
router.post('/', verifyToken, (req, res, next) =>
  messageController.create(req, res, next)
);

// update one message info
router.put('/:id', verifyToken, (req, res, next) =>
  messageController.update(req, res, next)
);

// update one message state
router.patch('/:id', verifyToken, (req, res, next) =>
  messageController.updateState(req, res, next)
);

// delete one message info
router.delete('/:id', verifyToken, (req, res, next) =>
  messageController.delete(req, res, next)
);

module.exports = router;
