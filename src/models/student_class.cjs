"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class StudentClass extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      StudentClass.hasMany(models.Student, {
        foreignKey: "class_id",
      });
      StudentClass.belongsTo(models.Major, {
        foreignKey: "major_id",
      });
    }
  }
  StudentClass.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      major_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      status: {
        type: DataTypes.SMALLINT,
        allowNull: false,
        defaultValue: 1, // 0: INACTIVE, 1: ACTIVE
      },
    },
    {
      sequelize,
      modelName: "StudentClass",
      tableName: "student_classes",
    },
  );
  return StudentClass;
};
