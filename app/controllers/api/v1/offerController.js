const offerService = require("../../../services/offerService");
const { User } = require("../../../models");
const { Product } = require("../../../models");

module.exports = {
  create(req, res) {
    // req.body.createdBy = req.user.email;
    console.log(req.body);
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
}