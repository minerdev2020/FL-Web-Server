const sequelize = require('sequelize');
const { Alert, AlertState, AlertType, Equipment } = require('../models');

const { Op } = sequelize;

module.exports = class AlertController {
  static async showStatesAndTypes(req, res, next) {
    try {
      const states = await AlertState.findAll({});
      const types = await AlertType.findAll({});
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
      const result = await Alert.findOne({
        include: [
          {
            model: AlertState,
            attributes: ['name'],
            as: 'state',
          },
          {
            model: AlertType,
            attributes: ['name'],
            as: 'type',
          },
          {
            model: Equipment,
            attributes: ['name', 'model_number'],
            as: 'breakdown_info',
          },
        ],
        where: { id: req.params.id },
      });

      const length = result !== null ? 1 : 0;
      if (result) {
        res.status(200).json({
          code: 200,
          message: `selected ${length} rows`,
          data: result,
        });
      } else {
        res.status(404).json({
          code: 404,
          message: "such id dose't exist!",
        });
      }
    } catch (err) {
      console.error(err);
      next(err);
    }
  }

  static async showAll(req, res, next) {
    try {
      const condition = {};
      if (req.query.keyword) {
        condition.name = {
          [Op.like]: `%${req.query.keyword}%`,
        };
      }

      if (req.query.group1 > 0) {
        condition.state_id = req.query.group1;
      }

      if (req.query.group2 > 0) {
        condition.type_id = req.query.group2;
      }

      const result = await Alert.findAll({
        include: [
          {
            model: AlertState,
            attributes: ['name'],
            as: 'state',
          },
          {
            model: AlertType,
            attributes: ['name'],
            as: 'type',
          },
          {
            model: Equipment,
            attributes: ['name', 'model_number'],
            as: 'breakdown_info',
          },
        ],
        where: condition,
        order: [['state_id', 'DESC'], ['type_id'], ['id']],
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
      const result = await Alert.create(req.body);
      const length = result !== null ? 1 : 0;
      res.status(201).json({
        code: 201,
        message: `created ${length} rows`,
        data: result,
      });

      req.app.get('io').of('/alerts').emit('create');
    } catch (err) {
      console.error(err);
      next(err);
    }
  }

  static async update(req, res, next) {
    try {
      console.log(req.body);
      const result = await Alert.update(req.body, {
        where: { id: req.params.id },
      });

      if (result) {
        res.status(200).json({
          code: 200,
          message: `updated ${result} rows`,
        });

        req.app.get('io').of('/alerts').emit('update');
      } else {
        res.status(404).json({
          code: 404,
          message: "such id dose't exist!",
        });
      }
    } catch (err) {
      console.error(err);
      next(err);
    }
  }

  static async delete(req, res, next) {
    try {
      const result = await Alert.destroy({
        where: { id: req.params.id },
      });

      if (result) {
        res.status(200).json({
          code: 200,
          message: `deleted ${result} rows`,
        });

        req.app.get('io').of('/alerts').emit('delete');
      } else {
        res.status(404).json({
          code: 404,
          message: "such id dose't exist!",
        });
      }
    } catch (err) {
      console.error(err);
      next(err);
    }
  }
};
