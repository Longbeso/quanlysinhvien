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
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      mssv: {
        type: DataTypes.STRING,
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
        type: DataTypes.SMALLINT,
        allowNull: false,
        defaultValue: "1", // 1 studying | 2 deferred (bảo lưu) | 3 Graduated / 0 dismissed (bị đuổi)
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
      paranoid: true,
    },
  );
  return Student;
};
