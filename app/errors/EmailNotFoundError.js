const ApplicationError = require('./ApplicationError');

class EmailNotFoundError extends ApplicationError {
  constructor() {
    super('Email Not Found!');
  }
}

module.exports = EmailNotFoundError;
