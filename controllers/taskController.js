const { Task, TaskState, TaskType, Equipment } = require('../models');

module.exports = class TaskController {
  static async showStatesAndTypes(req, res, next) {
    try {
      const states = await TaskState.findAll({});
      const types = await TaskType.findAll({});
      res.status(200).json({
        code: 200,
        message: `selected ${states.length + types.length} rows`,
        data: {
          states,
          types,
        },
      });
    } catch (err) {
      console.error(err);
      next(err);
    }
  }

  static async show(req, res, next) {
    try {
      const result = await Task.findOne({
        include: [
          {
            model: TaskState,
            attributes: ['name'],
            as: 'state',
          },
          {
            model: TaskType,
            attributes: ['name'],
            as: 'type',
          },
        ],
        where: { id: req.params.id },
      });
      const length = result !== null ? 1 : 0;
      if (result)
        res.status(200).json({
          code: 200,
          message: `selected ${length} rows`,
          data: result,
        });
      else
        res.status(404).json({
          code: 404,
          message: "such id dose't exist!",
        });
    } catch (err) {
      console.error(err);
      next(err);
    }
  }

  static async showAll(req, res, next) {
    try {
      const condition = { repairman_id: req.query.person_id };

      if (req.query.group1 > 0) {
        condition.state_id = req.query.group1;
      }

      if (req.query.group2 > 0) {
        condition.type_id = req.query.group2;
      }

      const result = await Task.findAll({
        include: [
          {
            model: Equipment,
            attributes: ['name'],
            as: 'target',
          },
          {
            model: TaskState,
            attributes: ['name'],
            as: 'state',
          },
          {
            model: TaskType,
            attributes: ['name'],
            as: 'type',
          },
        ],
        where: condition,
        order: [['state_id'], ['type_id']],
      });
      res.status(200).json({
        code: 200,
        message: `selected ${result.length} rows`,
        data: result,
      });
    } catch (err) {
      console.error(err);
      next(err);
    }
  }

  static async create(req, res, next) {
    try {
      console.log(req.body);
      const result = await Task.create(req.body);
      const length = result !== null ? 1 : 0;
      res.status(201).json({
        code: 201,
        message: `created ${length} rows`,
        data: result,
      });
    } catch (err) {
      console.error(err);
      next(err);
    }
  }

  static async update(req, res, next) {
    try {
      console.log(req.body);
      const result = await Task.update(req.body, {
        where: { id: req.params.id },
      });
      if (result)
        res.status(200).json({
          code: 200,
          message: `updated ${result} rows`,
        });
      else
        res.status(404).json({
          code: 404,
          message: "such id dose't exist!",
        });
    } catch (err) {
      console.error(err);
      next(err);
    }
  }

  static async updateState(req, res, next) {
    try {
      console.log(req.query.state);
      const result = await Task.update(
        { state_id: req.query.state },
        { where: { id: req.params.id } }
      );
      if (result)
        res.status(200).json({
          code: 200,
          message: `updated ${result} rows`,
        });
      else
        res.status(404).json({
          code: 404,
          message: "such id dose't exist!",
        });
    } catch (err) {
      console.error(err);
      next(err);
    }
  }

  static async delete(req, res, next) {
    try {
      const result = await Task.destroy({
        where: { id: req.params.id },
      });
      if (result)
        res.status(200).json({
          code: 200,
          message: `deleted ${result} rows`,
        });
      else
        res.status(404).json({
          code: 404,
          message: "such id dose't exist!",
        });
    } catch (err) {
      console.error(err);
      next(err);
    }
  }
};
