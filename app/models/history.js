'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class History extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      History.belongsTo(models.Product, {
        foreignKey: 'id_product',
      })
      History.belongsTo(models.Offer, {
        foreignKey: 'id_offer',
      })
      History.belongsTo(models.User, {
        foreignKey: 'id_seller',
      })
      History.belongsTo(models.User, {
        foreignKey: 'id_buyer',
      })
    }
  }
  History.init({
    id_product: DataTypes.INTEGER,
    id_offer: DataTypes.INTEGER,
    id_buyer: DataTypes.INTEGER,
    id_seller: DataTypes.INTEGER,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'History',
  });
  return History;
};