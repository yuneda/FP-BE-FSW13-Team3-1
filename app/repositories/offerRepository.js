const { Offer } = require('../models');

module.exports = {
  create(createArgs) {
    return Offer.create(createArgs);
  },

  findAll(args) {
    return Offer.findAll(args);
  },

  getTotalOffer(id) {
    return Offer.count({
      where: {
        id_user: id,
      },
    });
  },
};
