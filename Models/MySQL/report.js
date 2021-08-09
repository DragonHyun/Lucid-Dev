const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "report",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        comment: "신고인덱스",
      },
      report_user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: "신고유저인덱스",
        references: {
          model: "user",
          key: "id",
        },
      },
      reported_user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: "피신고유저인덱스",
        references: {
          model: "user",
          key: "id",
        },
      },
      report_reason_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: "신고사유인덱스",
        references: {
          model: "report_reason",
          key: "id",
        },
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
        comment: "신고내용",
      },
      is_complete: {
        type: DataTypes.TINYINT,
        allowNull: false,
        comment: "처리여부",
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        comment: "생성시점",
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: true,
        comment: "수정시점",
      },
      deleted_at: {
        type: DataTypes.DATE,
        allowNull: true,
        comment: "삭제시점",
      },
    },
    {
      sequelize,
      tableName: "report",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "id" }],
        },
        {
          name: "FK_report_report_reason_id_report_reason_id",
          using: "BTREE",
          fields: [{ name: "report_reason_id" }],
        },
        {
          name: "FK_report_report_user_id_user_id",
          using: "BTREE",
          fields: [{ name: "report_user_id" }],
        },
        {
          name: "FK_report_reported_user_id_user_id",
          using: "BTREE",
          fields: [{ name: "reported_user_id" }],
        },
      ],
    }
  );
};
