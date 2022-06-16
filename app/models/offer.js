'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Offer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Offer.belongsTo(models.User, {
        foreignKey: 'id_user',
      })
      Offer.belongsTo(models.Product, {
        foreignKey: 'id_product',
      })
    }
  }
  Offer.init({
    id_user: DataTypes.INTEGER,
    id_product: DataTypes.INTEGER,
    bid_price: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Offer',
  });
  return Offer;
};