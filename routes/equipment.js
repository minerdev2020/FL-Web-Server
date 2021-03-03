const express = require('express');
const equipmentController = require('../controllers/equipmentController');

const router = express.Router();

// get all equipment infos
router.get('/', (req, res, next) =>
  equipmentController.showAll(req, res, next)
);

// get one equipment info
router.get('/:id', (req, res, next) =>
  equipmentController.show(req, res, next)
);

// create one equipment info
router.post('/', (req, res, next) =>
  equipmentController.create(req, res, next)
);

// update one equipment info
router.put('/:id', (req, res, next) =>
  equipmentController.update(req, res, next)
);

// update one equipment state
router.patch('/:id', (req, res, next) =>
  equipmentController.updateState(req, res, next)
);

// delete one equipment info
router.delete('/:id', (req, res, next) =>
  equipmentController.delete(req, res, next)
);

// delete all equipment info
router.delete('/', (req, res, next) =>
  equipmentController.deleteAll(req, res, next)
);

module.exports = router;
