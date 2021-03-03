const { Person } = require('../models');

module.exports = class PersonController {
  static async show(req, res, next) {
    try {
      const result = await Person.findOne({
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
      const result = await Person.findAll({});
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
      const result = await Person.create(req.body);
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
      const result = await Person.update(req.body, {
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
      const result = await Person.destroy({
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
      const result = await Person.destroy({});
      res.json({ message: `deleted ${result} rows` });
    } catch (err) {
      console.error(err);
      next(err);
    }
  }
};
