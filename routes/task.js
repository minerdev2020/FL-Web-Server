const express = require('express');
const taskController = require('../controllers/taskController');
const { verifyToken } = require('../middlewares/auth');

const router = express.Router();

// get all equipment states and types
router.get('/list', verifyToken, (req, res, next) =>
  taskController.showStatesAndTypes(req, res, next)
);

// get all equipment infos
router.get('/', verifyToken, (req, res, next) =>
  taskController.showAll(req, res, next)
);

// get one equipment info
router.get('/:id', verifyToken, (req, res, next) =>
  taskController.show(req, res, next)
);

// create one equipment info
router.post('/', verifyToken, (req, res, next) =>
  taskController.create(req, res, next)
);

// update one equipment info
router.put('/:id', verifyToken, (req, res, next) =>
  taskController.update(req, res, next)
);

// update one equipment state
router.patch('/:id', verifyToken, (req, res, next) =>
  taskController.updateState(req, res, next)
);

// delete one equipment info
router.delete('/:id', verifyToken, (req, res, next) =>
  taskController.delete(req, res, next)
);

module.exports = router;
