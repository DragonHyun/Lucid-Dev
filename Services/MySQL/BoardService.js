const Board = require("../../Models/MySQL").board;
const sequelize = require("sequelize");

const boardService = {
  isBoardNameUnique: async (boardName) => {
    try {
      const result = await Board.findOne({
        attributes: [[sequelize.fn("COUNT", sequelize.col("id")), "count"]],
        where: {
          board_name: boardName,
          deleted_at: null,
        },
      });

      if (result.dataValues.count !== 0) {
        return false;
      }
      return true;
    } catch (err) {
      throw err;
    }
  },

  createBoard: async (boardName) => {
    try {
      const board = await Board.create({
        board_name: boardName,
      });

      return board;
    } catch (err) {
      throw err;
    }
  },

  modifyBoardName: async (boardId, boardName) => {
    try {
      await Board.update(
        { board_name: boardName },
        {
          where: { id: boardId },
        }
      );

      return true;
    } catch (err) {
      throw err;
    }
  },

  deleteBoard: async (boardId) => {
    try {
      await Board.update(
        { deleted_at: new Date() },
        { where: { id: boardId } }
      );

      return true;
    } catch (err) {
      throw err;
    }
  },

  allBoard: async () => {
    try {
      const allBoard = await Board.findAll({
        where: { deleted_at: null },
      });

      return allBoard;
    } catch (err) {
      throw err;
    }
  },
};

module.exports = boardService;
