"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("diary", {
      id: {
        autoIncrement: true,
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        comment: "일기인덱스",
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
      sleep_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        comment: "수면인덱스",
        references: {
          model: "sleep",
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
      is_lucid: {
        type: Sequelize.TINYINT,
        allowNull: false,
        comment: "루시드여부",
      },
      is_bookmark: {
        type: Sequelize.TINYINT,
        allowNull: false,
        comment: "즐겨찾기여부",
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
    await queryInterface.dropTable("diary");
  },
};
