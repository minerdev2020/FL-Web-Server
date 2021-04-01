const {
  Person,
  Message,
  MessageState,
  MessageType,
  Equipment,
  Sensor,
  Task,
} = require('../models');

module.exports = class MessageController {
  static async showStatesAndTypes(req, res, next) {
    try {
      const states = await MessageState.findAll({});
      const types = await MessageType.findAll({});
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
      const result = await Message.findOne({
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
            model: MessageState,
            attributes: ['name'],
            as: 'state',
          },
          {
            model: MessageType,
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
        condition.from_id = req.query.group1;
      }

      if (req.query.group1 > 0) {
        condition.state_id = req.query.group1;
      }

      if (req.query.group2 > 0) {
        condition.type_id = req.query.group2;
      }

      const result = await Message.findAll({
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
            model: MessageState,
            attributes: ['name'],
            as: 'state',
          },
          {
            model: MessageType,
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
      const result = await Message.destroy({
        where: { id: req.params.id },
      });

      if (result) {
        res.status(200).json({
          code: 200,
          message: `deleted ${result} rows`,
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
};
