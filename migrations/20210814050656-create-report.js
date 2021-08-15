"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("report", {
      id: {
        autoIncrement: true,
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        comment: "신고인덱스",
      },
      report_user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        comment: "신고유저인덱스",
        references: {
          model: "user",
          key: "id",
        },
      },
      reported_user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        comment: "피신고유저인덱스",
        references: {
          model: "user",
          key: "id",
        },
      },
      report_reason_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        comment: "신고사유인덱스",
        references: {
          model: "report_reason",
          key: "id",
        },
      },
      content: {
        type: Sequelize.TEXT,
        allowNull: false,
        comment: "신고내용",
      },
      is_complete: {
        type: Sequelize.TINYINT,
        allowNull: false,
        comment: "처리여부",
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
    await queryInterface.dropTable("report");
  },
};
