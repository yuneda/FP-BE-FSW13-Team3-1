const Sequelize = require('sequelize');
const productService = require('../../../services/productService');
const { User } = require('../../../models');

const { Op } = Sequelize;

function filterData(data, userFilter) {
  const dataFilter = data.data.filter((product) => product.category === userFilter);
  return { data: dataFilter };
}

function filterStatus(data, userFilter) {
  console.log(data.data)
  const statusProduct = data.data.filter((product) => product.status === userFilter);
  return statusProduct;
}

module.exports = {
  create(req, res, next) {
    req.body.id_user = req.user.id;

    productService
      .create(req.body)
      .then((product) => {
        req.body.product = product;

        next();
      })
      .catch((err) => {
        res.status(401).json({
          status: 'FAIL',
          message: err.message,
        });
      });
  },

  list(req, res) {
    const status = ['available', 'interested'];
    productService
      .list({
        where: { status },
        include: [
          {
            model: User,
            attributes: ['name', 'city'],
          },
        ],

      })
      .then((data, count) => {
        let result;
        result = data;
        if (req.query.filter) {
          const newData = filterData(data, req.query.filter);
          result = newData;
        }
        res.status(200).json({
          status: 'OK',
          data: {
            product: result,
          },
          meta: { total: count },
        });
      });
  },

  search(req, res) {
    const status = ['available', 'interested'];
    productService
      .list({
        where: {
          status,
          product_name: { [Op.iLike]: `%${req.query.name}%` },
        },
        include: [
          {
            model: User,
            attributes: ['name', 'city'],
          },
        ],
      })
      .then((data, count) => {
        let result;
        result = data;
        if (req.body.filter) {
          const newData = filterData(data, req.body.filter);
          result = newData;
        }
        res.status(200).json({
          status: 'OK',
          data: {
            product: result,
          },
          meta: { total: count },
        });
      });
  },

  haveProduct(req, res) {
    productService
      .list({
        where: {
          id_user: req.user.id
        },
        include: [
          {
            model: User,
            attributes: ['name', 'city'],
          },
        ],
      })
      .then((data) => {
        let result;
        result = data;

        if (req.query.status) {
          const newData = filterStatus(data, req.query.status);
          result = newData;
        }

        if (result.length === 0) {
          res.status(200).json({
            status: 'OK',
            message: "Doesn't have product",
          });
        } else {
          res.status(200).json({
            status: 'OK',
            data: {
              product: result,
            },

          });
        }
      });
  },

  show(req, res) {
    productService
      .getOne({
        where: { id: req.params.id },
        include: [
          {
            model: User,
            attributes: ['name', 'city'],
          },
        ],
      })
      .then((user) => {
        res.status(200).json({
          status: 'OK',
          data: user,
        });
      });
  },

  wishlist(req, res) {
    productService
      .list({
        where: { id: req.user.wishlist },
        include: [
          {
            model: User,
            attributes: ['name', 'city'],
          },
        ],
      })
      .then((user) => {
        res.status(200).json({
          status: 'OK',
          data: user,
        });
      });
  },

  update(req, res) {
    req.body.id_user = req.user.id;
    productService
      .update(req.params.id, req.body)
      .then(() => {
        res.status(200).json({
          status: 'OK',
          message: 'Data Updated Successfully',
        });
      });
  },

  updateStatus(req, res) {
    if (req.url === `/api/v1/product/${req.params.id}/statussold`) {
      req.body.id_user = req.user.id;
      const status = { status: 'sold' };
      productService
        .update(req.params.id, status)
        .then(() => {
          res.status(200).json({
            status: 'OK',
            message: 'Product Sold Successfully',
          });
        });
      return;
    }
    if (req.url === '/api/v1/offer') {
      req.body.id_user = req.user.id;
      const status = { status: 'interested' };
      productService
        .update(req.body.history.id_product, status)
        .then(() => {
          res.status(200).json({
            status: 'OK',
            message: 'Product Interested Successfully',
          });
        });
      return;
    }
  },

};
