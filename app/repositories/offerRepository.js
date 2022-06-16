const { Offer } = require("../models")

module.exports = {
  create(createArgs) {
    return Offer.create(createArgs);
  },

  find(id) {
    return Offer.findByPk(id);
  },

  findOne(key) {
    return Offer.findOne(key);
  },

  findAll(args) {
    return Offer.findAll(args);
  },

  getTotalOffer(args) {
    return Offer.count(args);
  },
}