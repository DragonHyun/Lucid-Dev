"use strict";
const { Model, Sequelize } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class board extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  board.init(
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        comment: "게시판인덱스",
      },
      board_name: {
        type: DataTypes.STRING(45),
        allowNull: false,
        comment: "게시판이름",
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
      modelName: "board",
      tableName: "board",
      timestamps: false,
    }
  );
  return board;
};
