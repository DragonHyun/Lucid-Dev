"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("post", {
      id: {
        autoIncrement: true,
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        comment: "게시글인덱스",
      },
      board_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        comment: "게시판인덱스",
        references: {
          model: "board",
          key: "id",
        },
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        comment: "유저인덱스",
        references: {
          model: "user",
          key: "id",
        },
      },
      title: {
        type: Sequelize.TEXT,
        allowNull: false,
        comment: "제목",
      },
      content: {
        type: Sequelize.TEXT,
        allowNull: false,
        comment: "내용",
      },
      have_image: {
        type: Sequelize.TINYINT,
        allowNull: false,
        comment: "이미지여부",
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
    await queryInterface.dropTable("post");
  },
};
