const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const usersService = require('../../../services/userService');
const { EmailNotFoundError } = require('../../../errors');
const jwt_decode = require("jwt-decode");

module.exports = {
  async register(req, res) {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    usersService.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      wishlist: [0]
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

  // async logingoogleregis(req, res) {
  //   const tokenId = req.body.tokenId
  //   const decoded = jwt_decode(tokenId);
  //   const email = decoded.email;
  //   const name = decoded.name;
  //   password = '1234567'
  //   const hashedPassword = await bcrypt.hash(password, 10);

  //   console.log(decoded)

  //   const user = await usersService.getOne({
  //     where: { email },
  //   });

  //   if (!user) {
  //     usersService.create({
  //       name,
  //       email: email.toLowerCase(),
  //       password: hashedPassword,
  //     })
  //       .then((createdUser) => {
  //         const token = jwt.sign({
  //           name: createdUser.name,
  //           email: createdUser.email
  //         }, process.env.JWT_PRIVATE_KEY || 'rahasia', {
  //           expiresIn: '24h',
  //         });
  //         res.status(200).json({
  //           name: createdUser.name,
  //           email: createdUser.email,
  //           token
  //         });
  //       });
  //   } else {
  //     const token = jwt.sign({
  //       name: user.name,
  //       email: user.email
  //     }, process.env.JWT_PRIVATE_KEY || 'rahasia', {
  //       expiresIn: '24h',
  //     });
  //     res.status(200).json({
  //       name: user.name,
  //       email: user.email,
  //       token
  //     });
  //   }
  // },

  // async logingoogletoken(req, res) {
  //   const tokenId = req.body.tokenId
  //   const decoded = jwt_decode(tokenId);

  //   console.log(decoded)

  //   const token = jwt.sign({
  //     name: decoded.name,
  //     email: decoded.email,
  //   }, process.env.JWT_PRIVATE_KEY || 'rahasia', {
  //     expiresIn: '24h',
  //   });

  //   res.status(200).json({
  //     name: decoded.name,
  //     email: decoded.email,
  //     token,
  //   });
  // },

  async getData(req, res) {
    usersService
      .get(req.user.id)
      .then((post) => {
        res.status(200).json({
          status: 'OK',
          data: post,
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
      });
  },

  addWishlist(req, res) {
    const { wishlist } = req.user;
    const addData = [req.body.id_product, ...wishlist];

    usersService
      .update(req.user.id, { wishlist: addData })
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
      .update(req.user.id, { wishlist: deleteData })
      .then(() => {
        res.status(200).json({
          status: 'OK',
          message: 'Data success updated!!',
        });
      });
  },
};
