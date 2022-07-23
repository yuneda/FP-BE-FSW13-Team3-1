const { Op } = require('sequelize');
const historyService = require('../../../services/historyService');
const { User, Product, Offer } = require('../../../models');

module.exports = {
  create(req, res, next) {
    if (req.url === '/api/v1/product') {
      req.body.id_seller = req.user.id;
      req.body.id_product = req.body.product.id;
      req.body.status = 'created';
      historyService
        .create(req.body)
        .then((history) => {
          res.status(201).json({
            status: 'OK',
            data: history,
          });
        });
      return;
    }
    if (req.url === '/api/v1/offer') {
      req.body.id_buyer = req.user.id;
      req.body.id_product = req.body.offer.id_product;
      req.body.id_offer = req.body.offer.id;
      req.body.status = 'offer';
      historyService
        .create(req.body)
        .then((history) => {
          req.body.history = history;
          next();
        });
    }
  },

  createAccOffer(req, res) {
    req.body.status = 'accept';
    historyService
      .create(req.body)
      .then((history) => {
        res.status(201).json({
          status: 'OK',
          data: history,
        });
      });
  },

  show(req, res) {
    historyService
      .getOne({
        where: { id: req.params.id },
        include: [
          {
            model: User,
            attributes: ['name', 'city'],
          },
          {
            model: Product,
            include: { all: true },
          },
          {
            model: Offer,
            include: { all: true },
          },
        ],
      })
      .then((history) => {
        res.status(200).json({
          status: 'OK',
          data: history,
        });
      });
  },

  haveNotif(req, res) {
    historyService
      .list({
        where: {
          [Op.or]: [{ id_buyer: req.user.id }, { id_seller: req.user.id }],
        },
        include: [
          {
            model: Product,
            attributes: ['product_name', 'product_price', 'image'],
          },
          {
            model: Offer,
            include: { all: true },
          },
        ],
        order: [['id', 'DESC']],
      })
      .then((history) => {
        res.status(200).json({
          status: 'OK',
          data: history,
        });
      });
  },
};
