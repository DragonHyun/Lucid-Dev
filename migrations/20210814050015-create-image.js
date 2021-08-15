"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("image", {
      id: {
        autoIncrement: true,
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        comment: "이미지인덱스",
      },
      target_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        comment: "타겟인덱스(diary / post)",
      },
      type: {
        type: Sequelize.STRING(5),
        allowNull: false,
        comment: "타겟타입",
      },
      image_url: {
        type: Sequelize.TEXT,
        allowNull: false,
        comment: "이미지",
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        comment: "생성시점",
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: true,
        comment: "수정시점",
      },
      deleted_at: {
        type: Sequelize.DATE,
        allowNull: true,
        comment: "삭제시점",
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("image");
  },
};
