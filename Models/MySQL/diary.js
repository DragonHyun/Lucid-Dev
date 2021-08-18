"use strict";
const { Model, Sequelize } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class diary extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  diary.init(
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        comment: "일기인덱스",
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: "유저인덱스",
        references: {
          model: "user",
          key: "id",
        },
      },
      sleep_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: "수면인덱스",
        references: {
          model: "sleep",
          key: "id",
        },
      },
      title: {
        type: DataTypes.TEXT,
        allowNull: false,
        comment: "제목",
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
        comment: "내용",
      },
      is_lucid: {
        type: DataTypes.TINYINT,
        allowNull: false,
        comment: "루시드여부",
      },
      is_bookmark: {
        type: DataTypes.TINYINT,
        allowNull: false,
        comment: "즐겨찾기여부",
      },
      have_image: {
        type: DataTypes.TINYINT,
        allowNull: false,
        comment: "이미지여부",
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRNET_TIMESTAMP"),
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
      modelName: "diary",
      tableName: "diary",
      timestamps: false,
    }
  );
  return diary;
};
