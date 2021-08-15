"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("user", {
      id: {
        autoIncrement: true,
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        comment: "유저 인덱스",
      },
      email: {
        type: Sequelize.STRING(50),
        allowNull: false,
        comment: "이메일",
      },
      password: {
        type: Sequelize.STRING(100),
        allowNull: false,
        comment: "비밀번호",
      },
      nickname: {
        type: Sequelize.STRING(20),
        allowNull: false,
        comment: "닉네임",
      },
      age: {
        type: Sequelize.INTEGER,
        allowNull: false,
        comment: "나이",
      },
      sex: {
        type: Sequelize.STRING(1),
        allowNull: false,
        comment: "성별 (M / W)",
      },
      profile_image_url: {
        type: Sequelize.TEXT,
        allowNull: false,
        comment: "프로필이미지",
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        comment: "생성시점",
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: true,
        comment: "수정시점",
      },
      deleted_at: {
        type: Sequelize.DATE,
        allowNull: true,
        comment: "삭제시점",
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("user");
  },
};
