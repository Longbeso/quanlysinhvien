// "use strict";

// /** @type {import('sequelize-cli').Migration} */
// module.exports = {
//   async up(queryInterface, Sequelize) {
//     await queryInterface.addColumn("course_sections", "start_date", {
//       type: Sequelize.DATEONLY,
//       allowNull: false,
//     });

//     await queryInterface.addColumn("course_sections", "end_date", {
//       type: Sequelize.DATEONLY,
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

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const table = await queryInterface.describeTable("course_sections");

    if (!table.start_date) {
      await queryInterface.addColumn("course_sections", "start_date", {
        type: Sequelize.DATEONLY,
        allowNull: false,
      });
    }

    if (!table.end_date) {
      await queryInterface.addColumn("course_sections", "end_date", {
        type: Sequelize.DATEONLY,
        allowNull: false,
      });
    }
  },
};
