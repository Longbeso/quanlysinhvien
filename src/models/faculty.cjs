"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Faculty extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Faculty.hasMany(models.Major, {
        foreignKey: "faculty_id",
      });
      Faculty.hasMany(models.Lecturer, {
        foreignKey: "faculty_id",
      });
    }
  }
  Faculty.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      status: {
        type: DataTypes.TINYINT, // 1: ACTIVE, 0: INACTIVE
        allowNull: false,
      },
      img: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      image_public_id: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      code: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      sequelize,
      modelName: "Faculty",
      tableName: "faculties",
    },
  );
  return Faculty;
};
