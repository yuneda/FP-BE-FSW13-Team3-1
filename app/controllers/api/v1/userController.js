const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const usersService = require('../../../services/userService');

module.exports = {
  async register(req, res) {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    usersService.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
    })
      .then((createdUser) => {
        res.status(201).json({
          status: 'Success',
          message: 'User Successfully Registered!',
          data: {
            name,
            id: createdUser.id,
            email,
          },
        });
      }).catch((err) => {
        res.status(400).json({
          status: 'FAIL',
          message: err.message,
        });
      });
  },

  async login(req, res) {
    const { user } = req;

    const token = jwt.sign({
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }, process.env.JWT_PRIVATE_KEY || 'rahasia', {
      expiresIn: '24h',
    });

    res.status(200).json({
      id: user.id,
      name: user.name,
      email: user.email,
      token,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  },

  async getData(req, res) {
    usersService
      .get(req.user.id)
      .then((post) => {
        res.status(200).json({
          status: 'OK',
          data: post,
        });
      })
      .catch((err) => {
        res.status(422).json({
          status: 'FAIL',
          message: err.message,
        });
      });
  },

  update(req, res) {
    usersService
      .update(req.user.id, req.body)
      .then(() => {
        res.status(200).json({
          status: 'OK',
          message: 'Data success updated!!',
        });
      })
      .catch((err) => {
        res.status(422).json({
          status: 'FAIL',
          message: err.message,
        });
      });
  },

  addWishlist(req, res) {
    const { wishlist } = req.user;
    const addData = [req.body.id_product, ...wishlist];

    usersService
      .updateWishlist(req.user.id, { wishlist: addData })
      .then(() => {
        res.status(200).json({
          status: 'OK',
          message: 'Data success updated!!',
        });
      })
      .catch((err) => {
        res.status(422).json({
          status: 'FAIL',
          message: err.message,
        });
      });
  },

  deleteWishlist(req, res) {
    const { wishlist } = req.user;
    const deleteData = wishlist.filter((element) => element !== req.body.id_product);

    usersService
      .updateWishlist(req.user.id, { wishlist: deleteData })
      .then(() => {
        res.status(200).json({
          status: 'OK',
          message: 'Data success updated!!',
        });
      })
      .catch((err) => {
        res.status(422).json({
          status: 'FAIL',
          message: err.message,
        });
      });
  },
};
