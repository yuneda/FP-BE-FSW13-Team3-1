const usersService = require("../services/userService")
const bcrypt = require('bcryptjs');
const { EmailNotFoundError, WrongPasswordError } = require("../errors");

module.exports = {
  async checkData(req, res, next) {
    const email = req.body.email.toLowerCase();
    const password = req.body.password;

    const user = await usersService.getOne({
      where: { email }
    })

    if (!user) {
      const err = new EmailNotFoundError();
      res.status(404).json(err)         
      return;
    }

    const comparePassword = await bcrypt.compareSync(password, user.password)

    if (!comparePassword) {
      const err = new WrongPasswordError();
      res.status(401).json(err)
      return;
    }
    req.user = user;
    next();
  },
}