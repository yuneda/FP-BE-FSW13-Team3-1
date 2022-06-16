// const { user, cars } = require("../../../models");
const usersService = require("../../../services/userService");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

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
          status: "Success",
          message: "User Successfully Registered!",
          data: {
            name,
            id: createdUser.id,
            email,
          }
        });
      }).catch((err) => {
        res.status(400).json({
          status: "FAIL",
          message: err.message,
        });
      });
  },

  async login(req, res) {
    const user = req.user;

    const token = jwt.sign({
      id: user.id,
      email: user.email,
      userName: user.userName,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }, process.env.JWT_PRIVATE_KEY || 'rahasia', {
      expiresIn: '1h'
    });

    res.status(201).json({
      id: user.id,
      email: user.email,
      userName: user.userName,
      token,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  },

  async whoAmI(req, res) {
    res.status(200).json(req.user);
  },

  async intoAdmin(req, res) {
    /**
     * superadmin
     */

    const user = await usersService.get(req.params.id)
    if (!user) {
      res.status(404).json({
        status: "FAIL",
        message: `User id ${req.params.id} tidak di temukan`,
      });
      return;
    }

    const admin = req.body.isAdmin;

    usersService.update(req.params.id, {
      isAdmin: admin
    }).then(() => {
      res.status(200).json({
        status: "OK",
        message: `User adalah admin.`,
      });
    }).catch((err) => {
      res.status(422).json({
        status: "FAIL",
        message: err.message,
      });
    });
  }

  // list(req, res) {
  //   usersService
  //     // .getAllCustomer({
  //     //   include: {
  //     //     model: cars,
  //     //   }
  //     // })
  //     .list()
  //     .then((user) => {
  //       res.status(200).json({
  //         status: "OK",
  //         data: {
  //           user,
  //         },
  //       });
  //     })
  //     .catch((err) => {
  //       res.status(400).json({
  //         status: "FAIL",
  //         message: err.message,
  //       });
  //     });
  // },



  // update(req, res) {
  //   const user = req.user;
  //   usersService
  //     .update(req.params.id, req.body)
  //     .then(() => {
  //       res.status(200).json({
  //         status: "OK",
  //         data: user,
  //       });
  //     })
  //     .catch((err) => {
  //       res.status(422).json({
  //         status: "FAIL",
  //         message: err.message,
  //       });
  //     });
  // },

  // show(req, res) {
  //   const user = req.user;

  //   res.status(200).json({
  //     status: "OK",
  //     data: user,
  //   });
  // },

  // destroy(req, res) {
  //   usersService
  //     .delete(req.user)
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

};
