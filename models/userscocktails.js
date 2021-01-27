'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class usersCocktails extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  usersCocktails.init({
    userId: DataTypes.INTEGER,
    cocktailId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'usersCocktails',
  });
  return usersCocktails;
};