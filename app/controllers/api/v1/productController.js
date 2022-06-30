const productService = require("../../../services/productService");
const { User } = require("../../../models");
const { query } = require("express");

const Sequelize = require('sequelize');
const Op = Sequelize.Op;


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
  create(req, res, next) {
    req.body.id_user = req.user.id;

    productService
      .create(req.body)
      .then((product) => {
        req.body.product = product;
        // console.log(req.body.product.product_name)
        // res.status(201).json({
        //   status: "OK",
        //   data: product,
        // });
        
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
    const status = ['available', 'interested']
    productService
      .list({
        where: { status: status },
        include: [
          {
            model: User,
            attributes: ["name", "city"],
          },
        ],

      })
      .then((data, count) => {
        let result;
        result = data;
        if (req.params.filter) {
          const newData = filterData(data, req.params.filter);
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

  search(req, res) {
    console.log(req.query)
    const status = ['available', 'interested']
    productService
      .list({
        where: { status: status, 
          product_name:{[Op.iLike]: `%${req.query.name}%`}
          // product_name: sequelize.where(sequelize.fn('LOWER', sequelize.col('product_name')), 'LIKE', '%' + req.query.name + '%')
        },
        include: [
          {
            model: User,
            attributes: ["name", "city"],
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
    productService
      .list({
        where: { id_user: req.user.id },
        include: [
          {
            model: User,
            attributes: ["name", "city"],
          },
        ],
      })
      .then((data, count) => {
        let result;
        result = data;
        if (req.body.status) {
          const newData = filterStatus(data, req.body.status);
          result = newData;
        }

        if (result == '') {
          res.status(404).json({
            status: "FAIL",
            message: "Doesn't have product",
          });
        } else {
          res.status(200).json({
            status: "OK",
            data: {
              product: result
            },
            // meta: { total: count },

          });
        }
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
      .getOne({
        where: { id: req.params.id },
        include: [
          {
            model: User,
            attributes: ["name", "city"],
          },
        ],
      })
      .then((user) => {
        res.status(200).json({
          status: "OK",
          data: user,
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
          message: "Data Updated Successfully",
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
          message: "Product Sold Successfully",
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
