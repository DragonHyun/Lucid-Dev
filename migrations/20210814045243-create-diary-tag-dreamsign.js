"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("diary_tag_dreamsign", {
      diary_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        comment: "일기인덱스",
        references: {
          model: "diary",
          key: "id",
        },
      },
      dreamsign_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        comment: "꿈표식인덱스",
        references: {
          model: "dreamsign",
          key: "id",
        },
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("diary_tag_dreamsign");
  },
};
