const { Sale } = require("../models")

module.exports = {
  create(createArgs) {
    return Sale.create(createArgs);
  },

  find(id) {
    return Sale.findByPk(id);
  },

  findOne(key) {
    return Sale.findOne(key);
  },

  findAll(args) {
    return Sale.findAll(args);
  },

  getTotalSale(args) {
    return Sale.count(args);
  },
};
