"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("sleep", {
      id: {
        autoIncrement: true,
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        commnet: "수면인덱스",
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
      start_at: {
        type: Sequelize.DATE,
        allowNull: false,
        comment: "시작시간",
      },
      end_at: {
        type: Sequelize.DATE,
        allowNull: false,
        comment: "종료시간",
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
    await queryInterface.dropTable("sleep");
  },
};
