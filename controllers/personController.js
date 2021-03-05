const { User, Person, PersonState, PersonType } = require('../models');

module.exports = class PersonController {
  static async show(req, res, next) {
    try {
      const result = await Person.findOne({
        include: [
          {
            model: User,
            attributes: ['user_id', 'ip'],
          },
          {
            model: PersonState,
            attributes: ['name'],
          },
          {
            model: PersonType,
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
      const result = await Person.findAll({
        include: [
          {
            model: User,
            attributes: ['user_id', 'ip'],
          },
          {
            model: PersonState,
            attributes: ['name'],
          },
          {
            model: PersonType,
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
      const result = await Person.create(req.body);
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
      const result = await Person.update(req.body, {
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
      await User.destroy({
        where: { person_id: req.params.id },
      });
      const result = await Person.destroy({
        where: { id: req.params.id },
      });
      if (result) {
        res.json({
          code: 204,
          message: `deleted ${result} rows`,
        });
      } else
        res.json({
          code: 404,
          message: "such id dose't exist!",
        });
    } catch (err) {
      console.error(err);
      next(err);
    }
  }
};
