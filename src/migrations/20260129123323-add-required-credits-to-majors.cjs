"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("majors", "required_credits", {
      type: Sequelize.INTEGER,
      allowNull: false,
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("majors", "required_credits");
  },
};
