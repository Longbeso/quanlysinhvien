"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Student extends Model {
    static associate(models) {
      Student.belongsTo(models.User, {
        foreignKey: "user_id",
      });
      Student.belongsTo(models.StudentClass, {
        foreignKey: "class_id",
      });
      Student.hasMany(models.Enrollment, {
        foreignKey: "student_id",
      });
    }
  }
  Student.init(
    {
      mssv: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },

      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
      },

      class_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      gender: {
        type: DataTypes.SMALLINT, // 0: male, 1: female, 2: other
        allowNull: false,
      },

      phone: {
        type: DataTypes.STRING(15),
        allowNull: true,
      },

      address: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      enroll_year: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      status: {
        type: DataTypes.ENUM("STUDYING", "PAUSED", "DROPPED"),
        allowNull: false,
        defaultValue: "STUDYING", // studying | paused | dropped
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: "Student",
    },
  );
  return Student;
};
