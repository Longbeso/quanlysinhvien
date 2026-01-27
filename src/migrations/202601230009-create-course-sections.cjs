"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("course_sections", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },

      subject_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "subjects",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
      },

      course_code: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      lecturer_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "lecturers",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
      },

      semester: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      school_year: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      max_student: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },

      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      status: {
        type: Sequelize.TINYINT,
        allowNull: false,
        defaultValue: 1, // 0: CLOSED, 1: OPEN, 2: CANCELLED
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },

      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    // unique: không được trùng lớp học phần trong cùng kỳ
    await queryInterface.addConstraint("course_sections", {
      fields: ["subject_id", "semester", "school_year", "course_code"],
      type: "unique",
      name: "unique_course_section_per_term",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("course_sections");
  },
};
