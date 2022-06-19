const historyService = require("../../../services/historyService");
const { User, Product, Offer } = require("../../../models");

module.exports = {
  create(req, res) {
    // req.body.id_seller = req.user.id;
    req.body.seller_name = req.user.name;
    // req.body.id_buyer = req.offer.id_user; id_buyer get from id_user offer, id_product get from id_product offer
    historyService
      .create(req.body)
      .then((history) => {
        console.log(history)
        res.status(201).json({
          status: "OK",
          data: history,
        });
      })
      .catch((err) => {
        res.status(401).json({
          status: "FAIL",
          message: err.message,
        });
      });
  },

  list(req, res) {
    historyService
      .list({
        include: [
          {
            model: User, // null bcs 2 user, should be call id_user from offer
            attributes: ["name"],
          },
          {
            model: User, // null bcs 2 user, should be call id_user from offer
            attributes: ["name"],
          },
          {
            model: Product,
            attributes: ["product_name", "product_price"],
          },
          {
            model: Offer,
            attributes: ["id_product", "bid_price"],
          },
        ],
      })
      .then((data, count) => {
        res.status(200).json({
          status: "OK",
          data: {
            history: data
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
};
