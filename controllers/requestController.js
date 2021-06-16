const sequelize = require('sequelize');
const {
  Person,
  Request,
  RequestState,
  RequestType,
  Equipment,
  Sensor,
  Task,
} = require('../models');

const { Op } = sequelize;

module.exports = class RequestController {
  static async showStatesAndTypes(req, res, next) {
    try {
      const states = await RequestState.findAll({});
      const types = await RequestType.findAll({});
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
      const result = await Request.findOne({
        include: [
          {
            model: Person,
            attributes: ['name'],
            as: 'from',
          },
          {
            model: Person,
            attributes: ['name'],
            as: 'replyer',
          },
          {
            model: RequestState,
            attributes: ['name'],
            as: 'state',
          },
          {
            model: RequestType,
            attributes: ['name'],
            as: 'type',
          },
          {
            model: Equipment,
            attributes: ['name', 'model_number'],
            as: 'equipment_info',
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
        const result = await Person.findAll({
          attributes: ['id'],
          where: {
            name: {
              [Op.like]: `%${req.query.keyword}%`,
            },
          },
        });

        const fromIdArray = [];
        result.forEach((element) => {
          fromIdArray.push(element.id);
        });
        condition.from_id = {
          [Op.in]: fromIdArray,
        };
      }

      if (req.query.group1 > 0) {
        condition.state_id = req.query.group1;
      }

      if (req.query.group2 > 0) {
        condition.type_id = req.query.group2;
      }

      const result = await Request.findAll({
        include: [
          {
            model: Person,
            attributes: ['name'],
            as: 'from',
          },
          {
            model: Person,
            attributes: ['name'],
            as: 'replyer',
          },
          {
            model: RequestState,
            attributes: ['name'],
            as: 'state',
          },
          {
            model: RequestType,
            attributes: ['name'],
            as: 'type',
          },
          {
            model: Equipment,
            attributes: ['name', 'model_number'],
            as: 'equipment_info',
          },
        ],
        where: condition,
        order: [['state_id'], ['updated_at', 'DESC']],
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
      const result = await Request.create(req.body);
      const length = result !== null ? 1 : 0;
      res.status(201).json({
        code: 201,
        message: `created ${length} rows`,
        data: result,
      });

      req.app.get('io').of('/messages').emit('create');
    } catch (err) {
      console.error(err);
      next(err);
    }
  }

  static async update(req, res, next) {
    try {
      console.log(req.body);
      const result = await Request.update(req.body, {
        where: { id: req.params.id },
      });

      req.app.get('io').of('/requests').emit('update');

      if (result) {
        // 接受申请
        if (req.body.state_id === 2) {
          switch (req.body.type_id) {
            case 1: // 维修申请
              // 将设备状态改为维修中
              await Equipment.update(
                { state_id: 2 },
                { where: { id: req.body.equipment_id } }
              );
              await Sensor.update(
                { state_id: 2 },
                { where: { parent_id: req.body.equipment_id } }
              );
              break;

            case 2: // 停用申请
              // 将设备状态改为停用中
              await Equipment.update(
                { state_id: 3 },
                { where: { id: req.body.equipment_id } }
              );
              await Sensor.update(
                { state_id: 3 },
                { where: { parent_id: req.body.equipment_id } }
              );
              break;

            default:
              break;
          }

          await Task.create({
            repairman_id: req.body.from_id,
            target_id: req.body.equipment_id,
            state_id: 1,
            type_id: req.body.type_id,
          });

          req.app.get('io').of('/equipments').emit('update');
        }

        res.status(200).json({
          code: 200,
          message: `updated ${result} rows`,
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

  static async delete(req, res, next) {
    try {
      const result = await Request.destroy({
        where: { id: req.params.id },
      });

      if (result) {
        res.status(200).json({
          code: 200,
          message: `deleted ${result} rows`,
        });

        req.app.get('io').of('/messages').emit('delete');
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
