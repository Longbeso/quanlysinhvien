"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Enrollment extends Model {
    static associate(models) {
      Enrollment.belongsTo(models.Student, {
        foreignKey: "student_id",
      });

      Enrollment.belongsTo(models.CourseSection, {
        foreignKey: "course_section_id",
      });
    }
  }

  Enrollment.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      student_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      course_section_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      enrolled_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },

      status: {
        type: DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 1, // 1 enrolled | 0 dropped | 2 completed
      },

      score: {
        type: DataTypes.DECIMAL(4, 2),
        allowNull: true,
      },

      score_alpha: {
        type: DataTypes.STRING(2),
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Enrollment",
      tableName: "enrollments",

      indexes: [
        {
          unique: true,
          fields: ["student_id", "course_section_id"],
          name: "unique_student_course_section",
        },
      ],
    },
  );

  return Enrollment;
};
