const usersService = require("../services/userService");
const {
  LengthPasswordError,
  WrongEmailFormatError,
  EmailAlreadyTakenError,
} = require('../errors');

module.exports = {
  async checkCondition(req, res, next) {
    const { email, password } = req.body;
    if (password.length < 6) {
      const err = new LengthPasswordError();
      res.status(400).json(err);
      return;
    }

    const filter = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/g

    if (email == '' || email.search(filter) == -1) {
      const err = new WrongEmailFormatError();
      res.status(400).json(err);
      return;
    }

    const uniqueEmail = await usersService.getOne({
      where: { email }
    });

    if (uniqueEmail) {
      const err = new EmailAlreadyTakenError(email);
      res.status(422).json(err);
      return;
    }
    next();
  },
}
