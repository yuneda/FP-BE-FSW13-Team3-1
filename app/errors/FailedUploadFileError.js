const ApplicationError = require('./ApplicationError');

class FailedUploadFileError extends ApplicationError {
  constructor() {
    super('Failed upload file!!!');
  }
}

module.exports = FailedUploadFileError;