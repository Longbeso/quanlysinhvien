"use strict";
const { Model } = require("sequelize");
const { FOREIGNKEYS } = require("sequelize/lib/query-types");
module.exports = (sequelize, DataTypes) => {
  class Refresh_token extends Model {
    static associate(models) {
      Refresh_token.belongsTo(models.User, {
        foreignKey: "user_id",
      });
    }
  }
  Refresh_token.init(
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Refresh_token",
    },
  );
  return Refresh_token;
};
