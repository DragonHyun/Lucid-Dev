"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("heart", {
      id: {
        autoIncrement: true,
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        comment: "좋아요인덱스",
      },
      post_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        comment: "게시글인덱스",
        references: {
          model: "post",
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
    await queryInterface.dropTable("heart");
  },
};
