"use strict";
const { Model, Sequelize } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class diary_tag_dreamsign extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  diary_tag_dreamsign.init(
    {
      diary_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        comment: "일기인덱스",
        references: {
          model: "diary",
          key: "id",
        },
      },
      dreamsign_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        comment: "꿈표식인덱스",
        references: {
          model: "dreamsign",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "diary_tag_dreamsign",
      tableName: "diary_tag_dreamsign",
      timestamps: false,
    }
  );
  return diary_tag_dreamsign;
};
