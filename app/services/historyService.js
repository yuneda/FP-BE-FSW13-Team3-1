const historyRepository = require('../repositories/historyRepository');

module.exports = {
  create(requestBody) {
    return historyRepository.create(requestBody);
  },

  async list(args) {
    try {
      const offer = await historyRepository.findAll(args);
      // const offerCount = await historyRepository.getTotalOffer(args);

      return {
        data: offer,
        // count: offerCount,
      };
    } catch (ex) {
      console.err(ex);
      throw ex;
    }
  },

  get(id) {
    return historyRepository.find(id);
  },

  getOne(key) {
    return historyRepository.findOne(key);
  },
};
