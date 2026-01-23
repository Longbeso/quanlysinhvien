"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Student extends Model {
    static associate(models) {
      // định nghĩa quan hệ sau
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

      // date_of_birth: {
      //   type: DataTypes.DATEONLY,
      //   allowNull: false,
      // },

      gender: {
        type: DataTypes.STRING,
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
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "studying", // studying | paused | dropped
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
