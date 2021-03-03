const { Sensor } = require('../models');

module.exports = class SensorController {
  static async show(req, res, next) {
    try {
      const result = await Sensor.findOne({
        where: { id: req.params.id },
      });
      const length = result !== null ? 1 : 0;
      res.json({
        message: `selected ${length} rows`,
        data: result,
      });
    } catch (err) {
      console.error(err);
      next(err);
    }
  }

  static async showAll(req, res, next) {
    try {
      const result = await Sensor.findAll({});
      res.json({
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
      res.json({ message: `updated ${result} rows` });
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
      res.json({ message: `deleted ${result} rows` });
    } catch (err) {
      console.error(err);
      next(err);
    }
  }

  static async deleteAll(req, res, next) {
    try {
      const result = await Sensor.destroy({});
      res.json({ message: `deleted ${result} rows` });
    } catch (err) {
      console.error(err);
      next(err);
    }
  }
};
