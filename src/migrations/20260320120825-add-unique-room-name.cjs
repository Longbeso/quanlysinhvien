"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint("rooms", {
      fields: ["name"],
      type: "unique",
      name: "unique_room_name",
    });
  },

  async down(queryInterface) {
    await queryInterface.removeConstraint("rooms", "unique_room_name");
  },
};
