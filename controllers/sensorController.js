const { Sensor, SensorState, SensorType } = require('../models');

module.exports = class SensorController {
  static async show(req, res, next) {
    try {
      const result = await Sensor.findOne({
        include: [
          {
            model: SensorState,
            attributes: ['name'],
          },
          {
            model: SensorType,
            attributes: ['name'],
          },
        ],
        where: { id: req.params.id },
      });
      const length = result !== null ? 1 : 0;
      if (result)
        res.json({
          code: 200,
          message: `selected ${length} rows`,
          data: result,
        });
      else
        res.json({
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
      const result = await Sensor.findAll({
        include: [
          {
            model: SensorState,
            attributes: ['name'],
          },
          {
            model: SensorType,
            attributes: ['name'],
          },
        ],
      });
      res.json({
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
      const result = await Sensor.create(req.body);
      const length = result !== null ? 1 : 0;
      res.json({
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
      const result = await Sensor.update(req.body, {
        where: { id: req.params.id },
      });
      if (result)
        res.json({
          code: 200,
          message: `updated ${result} rows`,
        });
      else
        res.json({
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
      const result = await Sensor.destroy({
        where: { id: req.params.id },
      });
      if (result)
        res.json({
          code: 204,
          message: `deleted ${result} rows`,
        });
      else
        res.json({
          code: 404,
          message: "such id dose't exist!",
        });
    } catch (err) {
      console.error(err);
      next(err);
    }
  }

  static async deleteAll(req, res, next) {
    try {
      const result = await Sensor.destroy({});
      res.json({
        code: 204,
        message: `deleted ${result} rows`,
      });
    } catch (err) {
      console.error(err);
      next(err);
    }
  }
};
