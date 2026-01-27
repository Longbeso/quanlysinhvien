"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("enrollments", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },

      student_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "students",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
      },

      course_section_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "course_sections",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
      },

      enrolled_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },

      status: {
        type: Sequelize.TINYINT,
        allowNull: false,
        defaultValue: 1, // 1 enrolled | 0 dropped | 2 completed
      },

      score: {
        type: Sequelize.DECIMAL(4, 2), // 10.00, 9.50
        allowNull: true,
      },

      score_alpha: {
        type: Sequelize.STRING(2), // A+, B+, A, B
        allowNull: true,
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

    // unique: sinh viên không được đăng ký trùng 1 lớp học phần
    await queryInterface.addConstraint("enrollments", {
      fields: ["student_id", "course_section_id"],
      type: "unique",
      name: "unique_student_course_section",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("enrollments");
  },
};
