const LengthPasswordError = require('./lengthPasswordError');
const WrongEmailFormatError = require('./WrongEmailFormatError');
const EmailAlreadyTakenError = require('./EmailAlreadyTakenError');
const EmailNotFoundError = require('./EmailNotFoundError');
const WrongPasswordError = require('./WrongPasswordError');
const FailedUploadFileError = require('./FailedUploadFileError');

module.exports = {
  LengthPasswordError,
  WrongEmailFormatError,
  EmailAlreadyTakenError,
  EmailNotFoundError,
  WrongPasswordError,
  FailedUploadFileError,
};
