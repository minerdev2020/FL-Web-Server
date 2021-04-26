const sequelize = require('sequelize');
const {
  Equipment,
  EquipmentState,
  EquipmentType,
  Sensor,
  SensorState,
  SensorType,
} = require('../models');

const { Op } = sequelize;

module.exports = class EquipmentController {
  static async showStatesAndTypes(req, res, next) {
    try {
      const states = await EquipmentState.findAll({});
      const types = await EquipmentType.findAll({});
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
      const result = await Equipment.findOne({
        include: [
          {
            model: EquipmentState,
            attributes: ['name'],
            as: 'state',
          },
          {
            model: EquipmentType,
            attributes: ['name'],
            as: 'type',
          },
          {
            model: Sensor,
            as: 'sensor_info',
            include: [
              {
                model: SensorState,
                attributes: ['name'],
                as: 'state',
              },
              {
                model: SensorType,
                attributes: ['name'],
                as: 'type',
              },
            ],
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

      const result = await Equipment.findAll({
        include: [
          {
            model: EquipmentState,
            attributes: ['name'],
            as: 'state',
          },
          {
            model: EquipmentType,
            attributes: ['name'],
            as: 'type',
          },
          {
            model: Sensor,
            attributes: ['id', 'name', 'model_number'],
            as: 'sensor_info',
            include: [
              {
                model: SensorState,
                attributes: ['name'],
                as: 'state',
              },
              {
                model: SensorType,
                attributes: ['name'],
                as: 'type',
              },
            ],
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
      const result = await Equipment.create(req.body);
      const length = result !== null ? 1 : 0;
      res.status(201).json({
        code: 201,
        message: `created ${length} rows`,
        data: result,
      });

      req.app.get('io').of('/equipments').emit('create');
    } catch (err) {
      console.error(err);
      next(err);
    }
  }

  static async update(req, res, next) {
    try {
      console.log(req.body);
      const result = await Equipment.update(req.body, {
        where: { id: req.params.id },
      });

      if (result) {
        res.status(200).json({
          code: 200,
          message: `updated ${result} rows`,
        });

        req.app.get('io').of('/equipments').emit('update');
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
      await Sensor.destroy({
        where: { parent_id: req.params.id },
      });
      const result = await Equipment.destroy({
        where: { id: req.params.id },
      });

      if (result) {
        res.status(200).json({
          code: 200,
          message: `deleted ${result} rows`,
        });

        req.app.get('io').of('/equipments').emit('delete');
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
