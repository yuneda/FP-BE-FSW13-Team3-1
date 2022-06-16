const offerRepository = require("../repositories/offerRepository")

module.exports = {
  create(requestBody) {
    return offerRepository.create(requestBody);
  },
}