const ApplicationError = require('./ApplicationError');

class WrongEmailFormatError extends ApplicationError {
  constructor() {
    super('Wrong email format!');
  }
}

module.exports = WrongEmailFormatError;
