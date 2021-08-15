"use strict";
const { Model, Sequelize } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  user.init(
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        comment: "유저 인덱스",
      },
      email: {
        type: DataTypes.STRING(50),
        allowNull: false,
        comment: "이메일",
      },
      password: {
        type: DataTypes.STRING(100),
        allowNull: false,
        comment: "비밀번호",
      },
      nickname: {
        type: DataTypes.STRING(20),
        allowNull: false,
        comment: "닉네임",
      },
      age: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: "나이",
      },
      sex: {
        type: DataTypes.STRING(1),
        allowNull: false,
        comment: "성별 (M / W)",
      },
      profile_image_url: {
        type: DataTypes.TEXT,
        allowNull: false,
        comment: "프로필이미지",
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
      modelName: "user",
      tableName: "user",
      hasTrigger: true,
      timestamps: false,
    }
  );
  return user;
};
