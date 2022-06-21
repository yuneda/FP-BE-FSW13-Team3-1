const saleService = require("../../../services/saleService");
const { Product, Offer } = require("../../../models");

module.exports = {
  list(req, res) {
    saleService
      .list({
        include: [
          {
            model: Product,
            attributes: ["product_name", "product_price"],
          },
          {
            model: Offer,
            attributes: ["bid_price"],
          }
        ],

      })
      .then((data, count) => {
        res.status(200).json({
          status: "OK",
          data: {
            product: data
          },
          meta: { total: count },
        });
      })
      .catch((err) => {
        res.status(400).json({
          status: "FAIL",
          message: err.message,
        });
      });
  },

  create(req, res) {
    req.body.id_user = req.user.id;

    saleService
      .create(req.body)
      .then((product) => {
        res.status(201).json({
          status: "OK",
          data: product,
        });
      })
      .catch((err) => {
        res.status(401).json({
          status: "FAIL",
          message: err.message,
        });
      });
  },

};
