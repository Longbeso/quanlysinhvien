// "use strict";

// /** @type {import('sequelize-cli').Migration} */
// module.exports = {
//   async up(queryInterface, Sequelize) {
//     await queryInterface.addColumn("users", "role", {
//       type: Sequelize.ENUM("admin", "student", "advisor"),
//       allowNull: false,
//       defaultValue: "student",
//     });

//     await queryInterface.changeColumn("users", "password", {
//       type: Sequelize.STRING(255),
//       allowNull: false,
//     });
//   },

//   async down(queryInterface, Sequelize) {
//     /**
//      * Add reverting commands here.
//      *
//      * Example:
//      * await queryInterface.dropTable('users');
//      */
//   },
// };

"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    // await queryInterface.addColumn("users", "role", {
    //   type: Sequelize.ENUM("admin", "student", "advisor"),
    //   allowNull: false,
    //   defaultValue: "student",
    // });

    await queryInterface.sequelize.query(`
      UPDATE users
      SET password = ''
      WHERE password IS NULL
    `);

    await queryInterface.changeColumn("users", "password", {
      type: Sequelize.STRING(255),
      allowNull: false,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn("users", "password", {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.removeColumn("users", "role");
  },
};
