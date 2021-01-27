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
      // models.usersCocktails.belongsToMany(models.user, {through: "user"})
      // models.usersCocktails.belongsToMany(models.cocktail, {through: "cocktail"})
      // not working below
      // models.usersCocktails.hasMany(models.user, {through: "user"})
      // models.usersCocktails.hasMany(models.cocktail, {through: "cocktail"})
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