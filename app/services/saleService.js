const saleRepository = require("../repositories/saleRepository")

module.exports = {
  create(requestBody) {
    return saleRepository.create(requestBody);
  },

  async list(args) {
    try {
      const sale = await saleRepository.findAll(args);
      // const productCount = await saleRepository.getTotalProducts(args);

      return {
        data: sale,
        // count: productCount,
      };
    } catch (err) {
      throw err;
    }
  },

  get(id) {
    return saleRepository.find(id);
  },

  getOne(key) {
    return saleRepository.findOne(key);
  },
};