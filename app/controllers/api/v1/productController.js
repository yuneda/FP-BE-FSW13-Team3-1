const productService = require("../../../services/productService");
const { User } = require("../../../models");

module.exports = {
  list(req, res) {
    productService
      .list({
        include: [
          {
            model: User,
            attributes: ["name", "email"],
          },
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
    // req.body.createdBy = req.user.email;

    productService
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

  show(req, res) {
    productService
      .get(req.params.id)
      .then((post) => {
        res.status(200).json({
          status: "OK",
          data: post,
        });
      })
      .catch((err) => {
        res.status(422).json({
          status: "FAIL",
          message: err.message,
        });
      });
  },

  update(req, res) {
    req.body.updatedBy = req.user.user_email;
    productService
      .update(req.params.id, req.body)
      .then(() => {
        res.status(200).json({
          status: "OK",
          message: "Data berhasil diperbarui",
        });
      })
      .catch((err) => {
        res.status(422).json({
          status: "FAIL",
          message: err.message,
        });
      });
  },

  deleted(req, res) {
    productService
      .deleted(req.params.id, { isDeleted: true, deletedBy: req.user.user_email })
      .then(() => {
        res.status(200).json({
          deletedBy: req.user.user_email,
        });
      })
      .catch((err) => {
        res.status(422).json({
          status: "FAIL",
          message: err.message,
        });
      });
  },

  // destroy(req, res) {
  //   productService.deleteCar(req.product)
  //     .then(() => {
  //       res.status(204).end();
  //     })
  //     .catch((err) => {
  //       res.status(422).json({
  //         status: "FAIL",
  //         message: err.message,
  //       });
  //     });
  // },

  // deleted(req, res) {
  //   const product = req.product;
  //   productService
  //     .update(req.params.id, {
  //       car_name,
  //       rent_cost,
  //       type,
  //       // image,
  //       createdBy,
  //       updatedBy,
  //       deletedBy: req.user.id
  //     })
  //     .then(() => {
  //       res.status(200).json({
  //         status: "OK",
  //         data: product,
  //       });
  //     })
  //     .catch((err) => {
  //       res.status(422).json({
  //         status: "FAIL",
  //         message: err.message,
  //       });
  //     });
  // },

  // setproduct(req, res, next) {
  //   productService.get(req.params.id)
  //     .then((product) => {
  //       if (!product) {
  //         res.status(404).json({
  //           status: "FAIL",
  //           message: "Post not found!",
  //         });

  //         return;
  //       }

  //       req.product = product;
  //       next()
  //     })
  //     .catch((err) => {
  //       res.status(404).json({
  //         status: "FAIL",
  //         message: "Post not found!",
  //       });
  //     });
  // },
};
