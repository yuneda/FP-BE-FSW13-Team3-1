const productRepository = require("../repositories/productRepository")

module.exports = {
  create(requestBody) {
    return productRepository.create(requestBody);
  },

  update(id, requestBody) {
    return productRepository.update(id, requestBody);
  },

  updateStatusSold(id, status) {
    return productRepository.updateStatus(id, status);
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

  filter(name) {
    return productRepository.filter(name);
  },

  getOne(key) {
    return productRepository.findOne(key);
  },
};