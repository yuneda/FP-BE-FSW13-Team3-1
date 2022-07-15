const { User } = require('../models');

module.exports = {
  create(createArgs) {
    return User.create(createArgs);
  },

  update(id, updatedData) {
    return User.update(updatedData, {
      where: {
        id,
      },
    });
  },

  find(id) {
    return User.findByPk(id);
  },

  findOne(key) {
    return User.findOne(key);
  },
};
