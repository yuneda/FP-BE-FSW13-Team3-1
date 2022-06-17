const usersService = require("../services/userService")
const bcrypt = require('bcryptjs')

module.exports = {
  async checkData(req, res, next) {
    const email = req.body.email.toLowerCase();
    const password = req.body.password;

    const user = await usersService.getOne({
      where: { email }
    })

    if (!user) {
      res.status(404).json({
        status: "FAIL",
        message: `Email not found!`,
      });
      return;
    }

    const comparePassword = await bcrypt.compareSync(password, user.password)

    if (!comparePassword) {
      res.status(401).json({
        message: 'Wrong Password. Please Try Again!'
      });
      return;
    }
    req.user = user;
    next();
  },
}