"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class dreamsign extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  dreamsign.init(
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        comment: "꿈표식인덱스",
      },
      dreamsign: {
        type: DataTypes.STRING(45),
        allowNull: false,
        comment: "꿈표식",
      },
    },
    {
      sequelize,
      modelName: "dreamsign",
      tableName: "dreamsign",
      timestamps: false,
    }
  );
  return dreamsign;
};
