"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Lecturer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Lecturer.belongsTo(models.User, {
        foreignKey: "user_id",
      });
      Lecturer.belongsTo(models.Faculty, {
        foreignKey: "faculty_id",
      });
      Lecturer.hasMany(models.CourseSection, {
        foreignKey: "lecturer_id",
      });
    }
  }
  Lecturer.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      faculty_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
      },
      gender: {
        type: DataTypes.SMALLINT, // // 1=MALE, 2=FEMALE, 3=OTHER
        allowNull: true,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Lecturer",
      tableName: "lecturers",
    },
  );
  return Lecturer;
};
