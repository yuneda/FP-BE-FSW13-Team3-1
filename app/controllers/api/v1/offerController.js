const offerService = require('../../../services/offerService');
const { User } = require('../../../models');
const { Product } = require('../../../models');

module.exports = {
  create(req, res, next) {
    req.body.id_user = req.user.id;
    offerService
      .create(req.body, {
        include: [{
          model: User,
          as: 'name_user',
        }],
      })
      .then((offer) => {
        req.body.offer = offer;
        next();
      })
      .catch((err) => {
        res.status(401).json({
          status: 'FAIL',
          message: err.message,
        });
      });
  },

  list(req, res) {
    offerService
      .list({
        include: [
          {
            model: User,
            include: { all: true },
          },
          {
            model: Product,
            include: { all: true },
          },
        ],
      })
      .then((data, count) => {
        res.status(200).json({
          status: 'OK',
          data: {
            offer: data,
          },
          meta: { total: count },
        });
      });
    // .catch((err) => {
    //   res.status(400).json({
    //     status: 'FAIL',
    //     message: err.message,
    //   });
    // });
  },
};
