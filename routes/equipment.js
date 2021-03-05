const express = require('express');
const equipmentController = require('../controllers/equipmentController');
const { verifyToken } = require('../middlewares/auth');

const router = express.Router();

// get all equipment infos
router.get('/', verifyToken, (req, res, next) =>
  equipmentController.showAll(req, res, next)
);

// get one equipment info
router.get('/:id', verifyToken, (req, res, next) =>
  equipmentController.show(req, res, next)
);

// create one equipment info
router.post('/', verifyToken, (req, res, next) =>
  equipmentController.create(req, res, next)
);

// update one equipment info
router.put('/:id', verifyToken, (req, res, next) =>
  equipmentController.update(req, res, next)
);

// update one equipment state
router.patch('/:id', verifyToken, (req, res, next) =>
  equipmentController.updateState(req, res, next)
);

// delete one equipment info
router.delete('/:id', verifyToken, (req, res, next) =>
  equipmentController.delete(req, res, next)
);

module.exports = router;
