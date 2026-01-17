"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn("users", "firstName");
    await queryInterface.removeColumn("users", "lastName");
  },

  async down(queryInterface, Sequelize) {
    // rollback: thêm lại cột nếu cần quay lui
    await queryInterface.addColumn("users", "firstName", {
      type: Sequelize.STRING,
    });

    await queryInterface.addColumn("users", "lastName", {
      type: Sequelize.STRING,
    });
  },
};
