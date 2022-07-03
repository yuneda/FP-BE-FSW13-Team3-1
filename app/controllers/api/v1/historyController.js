const historyService = require("../../../services/historyService");
const { User, Product, Offer } = require("../../../models");
const { Op } = require("sequelize");

module.exports = {
  // Create history after create product and offer
  create(req, res) {
    if (req.url === "/api/v1/product") {
      // req.body.seller_name = req.user.name;
      req.body.id_seller = req.user.id;
      req.body.id_product = req.body.product.id;
      req.body.status = "created";
      console.log(req.body);
      historyService
        .create(req.body)
        .then((history) => {
          // console.log(history)
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
      return;
    }
    if (req.url === "/api/v1/offer") {
      req.body.id_buyer = req.user.id;
      // req.body.seller_name = "";
      req.body.id_product = req.body.offer.id_product;
      req.body.id_offer = req.body.offer.id;
      req.body.status = "offer";
      console.log(req.body);
      historyService
        .create(req.body)
        .then((history) => {
          // console.log(history)
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
      return;
    }
    res.send("dia siapa");
  },

  createAccOffer(req, res) {
    req.body.status = "accept";
    historyService
      .create(req.body)
      .then((history) => {
        // console.log(history)
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
    return;
  },

  list(req, res) {
    historyService
      .list({
        include: [
          {
            model: User,
            attributes: ["name", "city"],
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
      .then((data, count) => {
        res.status(200).json({
          status: "OK",
          data: {
            history: data,
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

  show(req, res) {
    historyService
      .getOne({
        where: { id: req.params.id },
        include: [
          {
            model: Product,
            attributes: ["product_name", "product_price"],
          },
          {
            model: Offer,
            include: { all: true },
          },
        ],
      })
      .then((history) => {
        res.status(200).json({
          status: "OK",
          data: history,
        });
      })
      .catch((err) => {
        res.status(422).json({
          status: "FAIL",
          message: err.message,
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
            attributes: ["product_name", "product_price", "image"],
          },
          {
            model: Offer,
            include: { all: true },
          },
        ],
      })
      .then((history) => {
        res.status(200).json({
          status: "OK",
          data: history,
        });
      })
      .catch((err) => {
        res.status(422).json({
          status: "FAIL",
          message: err.message,
        });
      });
  },
};
