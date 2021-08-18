"use strict";
const { Model, Sequelize } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  image.init(
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        comment: "이미지인덱스",
      },
      target_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: "타겟인덱스(diary / post)",
      },
      type: {
        type: DataTypes.STRING(5),
        allowNull: false,
        comment: "타겟타입",
      },
      image_url: {
        type: DataTypes.TEXT,
        allowNull: false,
        comment: "이미지",
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
      modelName: "image",
      tableName: "image",
      timestamps: false,
    }
  );
  return image;
};
