const { Message } = require('../models');

module.exports = class MessageController {
  static async show(req, res, next) {
    try {
      const result = await Message.findOne({
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
      const result = await Message.findAll({});
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
      const result = await Message.create(req.body);
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
      const result = await Message.update(req.body, {
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
      const result = await Message.destroy({
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
      const result = await Message.destroy({});
      res.json({ message: `deleted ${result} rows` });
    } catch (err) {
      console.error(err);
      next(err);
    }
  }
};
