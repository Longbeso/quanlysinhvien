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
      CourseSection.belongsTo(models.Room, {
        foreignKey: "room_id",
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
      room_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
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

      // ngay hoc trong tuan 1-->7 <==> thứ 2 ---> chủ nhật
      day_of_week: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      // thời gian bắt đầu buổi học
      start_time: {
        type: DataTypes.TIME,
        allowNull: false,
      },

      // thời gian kết thúc buỗi học
      end_time: {
        type: DataTypes.TIME,
        allowNull: false,
      },

      // thời gian bắt đầu khóa học
      start_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },

      // thời gian kết thúc khóa học
      end_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },

      // kỳ học
      semester: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      // năm học
      school_year: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      // số học sinh tối đa
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
