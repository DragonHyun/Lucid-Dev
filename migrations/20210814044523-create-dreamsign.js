"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("dreamsign", {
      id: {
        autoIncrement: true,
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        comment: "꿈표식인덱스",
      },
      dreamsign: {
        type: Sequelize.STRING(45),
        allowNull: false,
        comment: "꿈표식",
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("dreamsign");
  },
};
