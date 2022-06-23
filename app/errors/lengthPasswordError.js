const ApplicationError = require('./ApplicationError');

class LengthPasswordError extends ApplicationError {
  constructor() {
    super('Password must have at least 6 characters!');
  }
}

module.exports = LengthPasswordError;