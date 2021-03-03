const { Message } = require('../models');

module.exports = class MessageController {
  static async show(req, res, next) {
    try {
      const result = await Message.findOne({
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
        res.status(404).json({ code: 404, message: "such id dose't exist!" });
    } catch (err) {
      console.error(err);
      next(err);
    }
  }

  static async showAll(req, res, next) {
    try {
      const result = await Message.findAll({});
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
      const result = await Message.create(req.body);
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
      const result = await Message.update(req.body, {
        where: { id: req.params.id },
      });
      if (result)
        res.status(200).json({ code: 200, message: `updated ${result} rows` });
      else
        res.status(404).json({ code: 404, message: "such id dose't exist!" });
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
      if (result)
        res.status(204).json({ code: 204, message: `deleted ${result} rows` });
      else
        res.status(404).json({ code: 404, message: "such id dose't exist!" });
    } catch (err) {
      console.error(err);
      next(err);
    }
  }

  static async deleteAll(req, res, next) {
    try {
      const result = await Message.destroy({});
      res.status(204).json({ code: 204, message: `deleted ${result} rows` });
    } catch (err) {
      console.error(err);
      next(err);
    }
  }
};
