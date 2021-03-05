const express = require('express');
const PersonController = require('../controllers/personController');
const { verifyToken } = require('../middlewares/auth');

const router = express.Router();

// get all person infos
router.get('/', verifyToken, (req, res, next) =>
  PersonController.showAll(req, res, next)
);

// get one person info
router.get('/:id', verifyToken, (req, res, next) =>
  PersonController.show(req, res, next)
);

// create one person info
router.post('/', verifyToken, (req, res, next) =>
  PersonController.create(req, res, next)
);

// update one person info
router.put('/:id', verifyToken, (req, res, next) =>
  PersonController.update(req, res, next)
);

// update one person state
router.patch('/:id', verifyToken, (req, res, next) =>
  PersonController.updateState(req, res, next)
);

// delete one person info
router.delete('/:id', verifyToken, (req, res, next) =>
  PersonController.delete(req, res, next)
);

module.exports = router;
