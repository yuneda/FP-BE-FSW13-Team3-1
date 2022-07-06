const { History } = require("../models")

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
    return History.findAll(args, {
      order: [
        ['id', 'DESC']
      ]
    });
  },

  getTotalHistory(args) {
    return History.count(args);
  },
}