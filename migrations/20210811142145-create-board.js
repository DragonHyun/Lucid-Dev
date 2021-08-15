"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("board", {
      id: {
        autoIncrement: true,
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        comment: "게시판인덱스",
      },
      board_name: {
        type: Sequelize.STRING(45),
        allowNull: false,
        comment: "게시판이름",
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
    await queryInterface.dropTable("board");
  },
};
