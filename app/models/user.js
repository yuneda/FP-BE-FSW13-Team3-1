'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Product, {
        foreignKey: 'id_user',
      })
      User.hasMany(models.Offer, {
        foreignKey: 'id_user',
      })
      User.hasMany(models.History, {
        foreignKey: 'id_buyer',
      })
      User.hasMany(models.History, {
        foreignKey: 'id_seller',
      })
    }
  }
  User.init({
    name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: "Email already used",
      },
    },

    password: DataTypes.STRING,
    no_tlpn: DataTypes.STRING,
    city: DataTypes.STRING,
    address: DataTypes.STRING,
    image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};