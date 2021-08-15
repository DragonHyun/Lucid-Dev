"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class post_hit extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  post_hit.init(
    {
      post_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        comment: "게시글인덱스",
        references: {
          model: "post",
          key: "id",
        },
      },
      hit: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: "조회수",
      },
    },
    {
      sequelize,
      modelName: "post_hit",
      tableName: "post_hit",
      timestamps: false,
    }
  );
  return post_hit;
};
