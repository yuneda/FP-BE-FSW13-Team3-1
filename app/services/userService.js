const userRepository = require("../repositories/userRepository")

module.exports = {
  create(requestBody) {
    return userRepository.create(requestBody);
  },

  update(id, requestBody) {
    return userRepository.update(id, requestBody);
  },
  
    // update(id, requestBody) {
    //   return userRepository.update(id, requestBody);
    // },
  
    // delete(id) {
    //   return userRepository.delete(id);
    // },
  
    // async list() {
    //   try {
    //     const users = await userRepository.findAll();
    //     const usersCount = await userRepository.getTotalUsers();
  
    //     return {
    //       data: users,
    //       count: usersCount,
    //     };
    //   } catch (err) {
    //     throw err;
    //   }
    // },
  get(id) {
      return userRepository.find(id);
  },

  getOne(key) {
      return userRepository.findOne(key);
  },

};