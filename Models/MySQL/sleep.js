"use strict";
const { Model, Sequelize } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class sleep extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  sleep.init(
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        commnet: "수면인덱스",
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
      start_at: {
        type: DataTypes.DATE,
        allowNull: false,
        comment: "시작시간",
      },
      end_at: {
        type: DataTypes.DATE,
        allowNull: false,
        comment: "종료시간",
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
      modelName: "sleep",
      tableName: "sleep",
      timestamps: false,
    }
  );
  return sleep;
};
