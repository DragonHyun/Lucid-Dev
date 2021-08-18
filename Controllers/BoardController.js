const { BoardService } = require("../Services/MySQL");

const CustomError = require("../Util/custom-error");
const { isPropertyDefined } = require("../Util/function");

const BoardController = {
  createBoard: async (req, res, next) => {},

  modifyBoard: async (req, res, next) => {},

  deleteBoard: async (req, res, next) => {},

  allBoard: async (req, res, next) => {},

  postOfBoard: async (req, res, next) => {},
};

module.exports = BoardController;
