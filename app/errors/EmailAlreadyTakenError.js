const ApplicationError = require('./ApplicationError');

class EmailAlreadyTakenError extends ApplicationError {
  constructor(email) {
    super(`${email} is already!`);
    this.email = email;
  }
}

module.exports = EmailAlreadyTakenError;
