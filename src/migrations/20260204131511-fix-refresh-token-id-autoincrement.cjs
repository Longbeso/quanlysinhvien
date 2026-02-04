"use strict";

module.exports = {
  async up(queryInterface) {
    await queryInterface.sequelize.query(`
      CREATE SEQUENCE IF NOT EXISTS refresh_tokens_id_seq;
      ALTER TABLE refresh_tokens
      ALTER COLUMN id SET DEFAULT nextval('refresh_tokens_id_seq');
    `);
  },

  async down(queryInterface) {
    await queryInterface.sequelize.query(`
      ALTER TABLE refresh_tokens
      ALTER COLUMN id DROP DEFAULT;
    `);
  },
};
