const ApplicationError = require('./ApplicationError');

class WrongPasswordError extends ApplicationError {
  constructor() {
    super('Wrong Password. Please Try Again!');
  }
}

module.exports = WrongPasswordError;
