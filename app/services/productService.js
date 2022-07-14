const productRepository = require('../repositories/productRepository');

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

  async list(args) {
    try {
      const product = await productRepository.findAll(args);
      const productCount = await productRepository.getTotalProduct(args);

      return {
        data: product,
        count: productCount,
      };
    } catch (ex) {
      console.err(ex);
      throw ex;
    }
  },

  get(id) {
    return productRepository.find(id);
  },

  filter(category) {
    return productRepository.filter(category);
  },

  getOne(key) {
    return productRepository.findOne(key);
  },
};
