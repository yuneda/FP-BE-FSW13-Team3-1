const offerService = require("../../../services/offerService");
const { User } = require("../../../models");
const { Product } = require("../../../models");

module.exports = {
  create(req, res) {
    // res.send(req.user.id_user)
    req.body.id_user = req.user.id;
    // console.log(req.body);
    offerService
      .create(req.body)
      .then((offer) => {
        console.log(offer)
        res.status(201).json({
          status: "OK",
          data: offer,
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
    offerService
      .list({
        include: [
          {
            model: User,
            attributes: ["name", "email"],
          },
          {
            model: Product,
            attributes: ["product_name", "product_price"],
          },
        ],
      })
      .then((data, count) => {
        res.status(200).json({
          status: "OK",
          data: {
            offer: data
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
}