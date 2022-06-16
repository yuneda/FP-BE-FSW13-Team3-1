const productRepository = require("../repositories/productRepository")

module.exports = {
  create(requestBody) {
    return productRepository.create(requestBody);
  },

  update(id, requestBody) {
    return productRepository.update(id, requestBody);
  },

  deleted(id, requestBody) {
    return productRepository.deleted(id, requestBody);
  },

  async list(args) {
    try {
      const product = await productRepository.findAll(args);
      // const productCount = await productRepository.getTotalProducts(args);

      return {
        data: product,
        // count: productCount,
      };
    } catch (err) {
      throw err;
    }
  },

  get(id) {
    return productRepository.find(id);
  },

  getOne(key) {
    return productRepository.findOne(key);
  },
};