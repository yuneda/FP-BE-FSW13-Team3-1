const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { User } = require('../../../models')
const SALT = 10

function encryptPassword(password) {
    return new Promise((resolve, reject) => {
      bcrypt.hash(password, SALT, (err, encryptedPassword) => {
        if (!!err) {
          reject(err);
          return;
        }
  
        resolve(encryptedPassword);
      });
    });
  }
  
  function checkPassword(encryptedPassword, password) {
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, encryptedPassword, (err, isPasswordCorrect) => {
        if (!!err) {
          reject(err);
          return;
        }
  
        resolve(isPasswordCorrect);
      });
    });
  }
  
  module.exports = {
    async register(req, res) {
      const email = req.body.user_email;
      const encryptedPassword = await encryptPassword(req.body.password);
      const role = req.body.role;
      const user = await User.create({ email, encryptedPassword, role });
      res.status(201).json({
        id: user.id,
        user_email: user.email,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      });
    },

    // async register(req, res, next) {
    //     const { user_email, password, role } = req.body
    //     try {
    //         if (password.length < 8) {
    //             res.status(400).json({
    //                 status: 'failed',
    //                 message: 'Password must be at least 8 characters'
    //             })
    //         }

    //         // const re_email = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    //         // if (email !== '' && !email.match(re_email)) {
    //         //     res.status(400).json({
    //         //         status: 'failed',
    //         //         message: "Format email wrongs"
    //         //     })
    //         // }

    //         const hashedPassword = await bcrypt.hash(password, SALT);
    //         const user = await User.create({
    //             email: user_email.toLowerCase(),
    //             password: hashedPassword,
    //             role
    //         })
    //         console.log(user)
    //         res.status(201).json({
    //             status: "success",
    //             message: "User successfully registered",
    //             data: {
    //                 id: user.id,
    //                 email: user.email,
    //                 role
    //             }
    //         })
    //     } catch (err) {
    //         res.status(400).json({
    //             status: "failed",
    //             message: err.message
    //         })
    //     }
    // },
  
    async login(req, res) {
      const email = req.body.email.toLowerCase(); 
      const password = req.body.password;
  
      const user = await User.findOne({
        where: { email },
      });
  
      if (!user) {
        res.status(404).json({ message: "Email tidak ditemukan" });
        return;
      }
  
      const isPasswordCorrect = await checkPassword(
        user.encryptedPassword,
        password
      );
  
      if (!isPasswordCorrect) {
        res.status(401).json({ message: "Password salah!" });
        return;
      }
  
      res.status(201).json({
        id: user.id,
        email: user.email,
        token: "token",
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      });
    },
  };