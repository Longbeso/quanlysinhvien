"use strict";

module.exports = {
  async up(queryInterface) {
    await queryInterface.removeConstraint(
      "refresh_tokens",
      "refresh_tokens_user_id_key",
    );
  },

  async down(queryInterface) {
    await queryInterface.addConstraint("refresh_tokens", {
      fields: ["user_id"],
      type: "unique",
      name: "refresh_tokens_user_id_key",
    });
  },
};
