const productService = require("../../../services/productService");
const { User } = require("../../../models");

function filterData(data, userFilter) {
  const dataFilter = data.data.filter((product) => {
    return product.category == userFilter;
  })
  return dataFilter;
}

function filterStatus(data, userFilter) {
  const statusProduct = data.data.filter((product) => {
    return product.status == userFilter;
  })
  return statusProduct;
}

module.exports = {
  create(req, res) {
    req.body.id_user = req.user.id;

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

  list(req, res) {
    const status = ['available', 'interested']
    productService
      .list({
        where: { status: status },
        include: [
          {
            model: User,
            attributes: ["name", "email"],
          },
        ],

      })
      .then((data, count) => {
        let result;
        result = data;
        console.log(req.body.filter)
        if (req.body.filter) {
          const newData = filterData(data, req.body.filter);
          result = newData;
        }
        res.status(200).json({
          status: "OK",
          data: {
            product: result
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

  haveProduct(req, res) {
    console.log(req.user.id)
    productService
      .list({
        where: { id_user: req.user.id}
      })
      .then((data, count) => {
        let result;
        result = data;
        if (req.body.status) {
          const newData = filterStatus(data, req.body.status);
          result = newData;
        }
        res.status(200).json({
          status: "OK",
          data: {
            product: result
          },
          // meta: { total: count },
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

  filter(req, res) {
    // const choice = {}
    if (req.params.category === 1) {
      return category = "Hobi"
    } else if (req.params.category === 2) {
      return category = "Kendaraan"
    } else if (req.params.category === 3) {
      return category = "Baju"
    } else if (req.params.category === 4) {
      return category = "Elektronik"
    } else if (req.params.category === 5) {
      return category = "Kesehatan"
    }
    // console.log(req.params.category, {category: req.params.category})
    productService
      .filter(req.params.category)
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
    req.body.id_user = req.user.id;
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

  updateStatusSold(req, res) {
    req.body.id_user = req.user.id;
    const status = { status: 'sold' }
    productService
      .updateStatusSold(req.params.id, status)
      .then(() => {
        res.status(200).json({
          status: "OK",
          message: "Produk Berhasil Terjual",
        });
      })
      .catch((err) => {
        res.status(422).json({
          status: "FAIL",
          message: err.message,
        });
      });
  },

  // deleted(req, res) {
  //   productService
  //     .deleted(req.params.id, { isDeleted: true, deletedBy: req.user.user_email })
  //     .then(() => {
  //       res.status(200).json({
  //         deletedBy: req.user.user_email,
  //       });
  //     })
  //     .catch((err) => {
  //       res.status(422).json({
  //         status: "FAIL",
  //         message: err.message,
  //       });
  //     });
  // },
};
