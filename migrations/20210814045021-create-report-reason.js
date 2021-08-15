"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("report_reason", {
      id: {
        autoIncrement: true,
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        comment: "신고사유인덱스",
      },
      reason: {
        type: Sequelize.STRING(45),
        allowNull: false,
        comment: "신고사유",
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("report_reason");
  },
};
