"use strict";
const Board = require("../Models/MySQL").board;
const User = require("../Models/MySQL").user;
const { Op } = require("sequelize");

const request = require("supertest");
const app = require("../app");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    const user = await User.findOne({
      where: { email: "test_about_post_user@gmail.com" },
    });
    const userId = user.dataValues.id;

    const board = await Board.findOne({
      where: { board_name: "Test about post" },
    });
    const boardId = board.dataValues.id;

    await queryInterface.bulkInsert("post", [
      {
        user_id: userId,
        board_id: boardId,
        title: "post 1",
        content: "post 1",
        have_image: "N",
      },
      {
        user_id: userId,
        board_id: boardId,
        title: "post 2",
        content: "post 2",
        have_image: "N",
      },
      {
        user_id: userId,
        board_id: boardId,
        title: "post 3",
        content: "post 3",
        have_image: "N",
      },
      {
        user_id: userId,
        board_id: boardId,
        title: "post 4",
        content: "post 4",
        have_image: "N",
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
