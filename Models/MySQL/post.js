"use strict";
const { Model, Sequelize } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  post.init(
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        comment: "게시글인덱스",
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
      board_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: "게시판인덱스",
        references: {
          model: "board",
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
      have_image: {
        type: DataTypes.TINYINT,
        allowNull: false,
        comment: "이미지여부",
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
      modelName: "post",
      tableName: "post",
      timestamps: false,
    }
  );
  return post;
};
