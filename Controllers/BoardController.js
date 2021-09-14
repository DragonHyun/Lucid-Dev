const { BoardService } = require("../Services/MySQL");

const CustomError = require("../Util/custom-error");
const { isPropertyDefined } = require("../Util/function");

const BoardController = {
  checkBoardNameUnique: async (req, res, next) => {
    const { boardName } = req.body;
    let isUnique;

    try {
      if (!(await isPropertyDefined(boardName)))
        throw new CustomError(400, "필수 요소가 존재하지 않습니다.");

      isUnique = await BoardService.isBoardNameUnique(boardName);

      res.status(200).json({
        code: 200,
        message: "게시판 이름 unique 여부 확인 성공",
        result: isUnique,
      });
    } catch (err) {
      next(err);
    }
  },

  createBoard: async (req, res, next) => {
    const { boardName } = req.body;

    try {
      if (!(await isPropertyDefined(boardName)))
        throw new CustomError(400, "필수 요소가 존재하지 않습니다.");

      if (!(await BoardService.isBoardNameUnique(boardName)))
        throw new CustomError(461, "게시판 이름이 중복 됩니다.");

      const board = await BoardService.createBoard(boardName);

      res.status(200).json({
        code: 200,
        message: "게시판 생성 성공",
        result: board,
      });
    } catch (err) {
      next(err);
    }
  },

  modifyBoard: async (req, res, next) => {
    const { boardId } = req.params;
    const { boardName } = req.body;

    try {
      if (!(await isPropertyDefined(boardId, boardName)))
        throw new CustomError(400, "필수 요소가 존재하지 않습니다.");

      if (!(await BoardService.isBoardNameUnique(boardName)))
        throw new CustomError(461, "게시판 이름이 중복 됩니다.");

      await BoardService.modifyBoardName(boardId, boardName);

      res.status(200).json({
        code: 200,
        message: "게시판 이름 변경에 성공 했습니다.",
      });
    } catch (err) {
      next(err);
    }
  },

  deleteBoard: async (req, res, next) => {
    const { boardId } = req.params;

    try {
      if (!(await isPropertyDefined(boardId)))
        throw new CustomError(400, "필수 요소가 존재하지 않습니다.");

      await BoardService.deleteBoard(boardId);

      res.status(200).json({
        code: 200,
        message: "게시판 삭제에 성공 했습니다.",
      });
    } catch (err) {
      next(err);
    }
  },

  allBoard: async (req, res, next) => {
    try {
      const allBoard = await BoardService.allBoard();

      res.status(200).json({
        code: 200,
        message: "모든 게시판 조회 성공",
        result: allBoard,
      });
    } catch (err) {
      next(err);
    }
  },

  postOfBoard: async (req, res, next) => {},
};

module.exports = BoardController;
