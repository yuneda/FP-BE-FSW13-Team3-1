const { History } = require('../models');

module.exports = {
  create(createArgs) {
    return History.create(createArgs);
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
};
