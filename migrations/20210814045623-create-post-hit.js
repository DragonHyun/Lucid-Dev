"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("post_hit", {
      post_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        comment: "게시글인덱스",
        references: {
          model: "post",
          key: "id",
        },
      },
      hit: {
        type: Sequelize.INTEGER,
        allowNull: false,
        comment: "조회수",
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("post_hit");
  },
};
