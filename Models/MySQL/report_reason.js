"use strict";
const { Model, Sequelize } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class report_reason extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  report_reason.init(
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        comment: "신고사유인덱스",
      },
      reason: {
        type: DataTypes.STRING(45),
        allowNull: false,
        comment: "신고사유",
      },
    },
    {
      sequelize,
      modelName: "report_reason",
      tableName: "report_reason",
      timestamps: false,
    }
  );
  return report_reason;
};
