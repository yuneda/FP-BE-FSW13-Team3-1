const offerService = require("../../../services/offerService");
const { User } = require("../../../models");
const { Product } = require("../../../models");

module.exports = {
  create(req, res, next) {
    // res.send(req.user.id_user)
    req.body.id_user = req.user.id;
    console.log(req.url);
    offerService
      .create(req.body, {
        include: [{
          model: User,
          as: 'name_user'
        }]
      })
      .then((offer) => {
        // console.log(offer)
        // res.status(201).json({
        //   status: "OK",
        //   data: offer,
        // });
        req.body.offer = offer;
        console.log(req.body.offer)
        next();
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
            attributes: ["name", "city"],
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