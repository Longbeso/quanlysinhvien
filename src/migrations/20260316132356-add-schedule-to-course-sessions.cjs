"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("course_sections", "day_of_week", {
      type: Sequelize.INTEGER,
      allowNull: false,
    });

    await queryInterface.addColumn("course_sections", "start_time", {
      type: Sequelize.TIME,
      allowNull: false,
    });

    await queryInterface.addColumn("course_sections", "end_time", {
      type: Sequelize.TIME,
      allowNull: false,
    });

    await queryInterface.addColumn("course_sections", "room_id", {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: "rooms",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn("course_sections", "day_of_week");

    await queryInterface.removeColumn("course_sections", "start_time");

    await queryInterface.removeColumn("course_sections", "end_time");

    await queryInterface.removeColumn("course_sections", "room_id");
  },
};
