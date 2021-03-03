const express = require('express');
const PersonController = require('../controllers/personController');

const router = express.Router();

// get all person infos
router.get('/', (req, res, next) => PersonController.showAll(req, res, next));

// get one person info
router.get('/:id', (req, res, next) => PersonController.show(req, res, next));

// create one person info
router.post('/', (req, res, next) => PersonController.create(req, res, next));

// update one person info
router.put('/:id', (req, res, next) => PersonController.update(req, res, next));

// update one person state
router.patch('/:id', (req, res, next) =>
  PersonController.updateState(req, res, next)
);

// delete one person info
router.delete('/:id', (req, res, next) =>
  PersonController.delete(req, res, next)
);

// delete all person info
router.delete('/', (req, res, next) =>
  PersonController.deleteAll(req, res, next)
);

module.exports = router;
