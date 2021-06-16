const express = require('express');
const requestController = require('../controllers/requestController');
const { verifyToken } = require('../middlewares/auth');

const router = express.Router();

// get all request states and types
router.get('/list', verifyToken, (req, res, next) =>
  requestController.showStatesAndTypes(req, res, next)
);

// get all request infos
router.get('/', verifyToken, (req, res, next) =>
  requestController.showAll(req, res, next)
);

// get one request info
router.get('/:id', verifyToken, (req, res, next) =>
  requestController.show(req, res, next)
);

// create one request info
router.post('/', verifyToken, (req, res, next) =>
  requestController.create(req, res, next)
);

// update one request info
router.put('/:id', verifyToken, (req, res, next) =>
  requestController.update(req, res, next)
);

// update one request state
router.patch('/:id', verifyToken, (req, res, next) =>
  requestController.updateState(req, res, next)
);

// delete one request info
router.delete('/:id', verifyToken, (req, res, next) =>
  requestController.delete(req, res, next)
);

module.exports = router;
