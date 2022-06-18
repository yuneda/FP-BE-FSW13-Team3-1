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