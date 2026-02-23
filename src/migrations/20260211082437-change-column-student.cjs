module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn("students", "status", {
      type: Sequelize.SMALLINT,
      allowNull: false,
      defaultValue: 1, // // 1 studying | 2 deferred (bảo lưu) | 3 Graduated / 0 dismissed (bị đuổi)
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn("students", "status", {
      type: Sequelize.SMALLINT,
      allowNull: false,
      defaultValue: 1, // // 1 studying | 2 deferred (bảo lưu) | 3 Graduated / 0 dismissed (bị đuổi)
    });
  },
};
