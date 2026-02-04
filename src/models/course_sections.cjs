"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class CourseSection extends Model {
    /**
     * Định nghĩa quan hệ
     */
    static associate(models) {
      CourseSection.belongsTo(models.Subject, {
        foreignKey: "subject_id",
      });

      CourseSection.belongsTo(models.Lecturer, {
        foreignKey: "lecturer_id",
      });

      CourseSection.hasMany(models.Enrollment, {
        foreignKey: "course_section_id",
      });
    }
  }

  CourseSection.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      subject_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      course_code: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      lecturer_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      semester: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      school_year: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      max_student: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      status: {
        type: DataTypes.SMALLINT,
        allowNull: false,
        defaultValue: 1, // 0: CLOSED, 1: OPEN, 2: CANCELLED
      },
    },
    {
      sequelize,
      modelName: "CourseSection",
      tableName: "course_sections",
    },
  );

  return CourseSection;
};
