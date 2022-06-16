const { User } = require("../models")

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

  // delete(id) {
  //   return User.destroy(id);
  // },

  find(id) {
    return User.findByPk(id);
  },

  // findAll() {
  //   return User.findAll();
  // },

  // getTotalUser() {
  //   return User.count();
  // },


  findOne(key) {
    return User.findOne(key);
  },

};
