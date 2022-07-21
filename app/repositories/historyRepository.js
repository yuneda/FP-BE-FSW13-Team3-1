const { History } = require('../models');
const { Op } = require("sequelize");

module.exports = {
  create(createArgs) {
    return History.create(createArgs);
  },

  find(id) {
    return History.findByPk(id);
  },

  findOne(key) {
    return History.findOne(key);
  },

  findAll(args) {
    return History.findAll(args);
  },

  getTotalHistory(args) {
    return History.count(args);
  },
 
  deleted(id) {
    return History.destroy({
      where: {
        [Op.or]: [{id_buyer: id}, {id_seller: id}]
      },
    });
  },
};
