const { PostService } = require("../Services/MySQL");
const { ImageService } = require("../Services/MySQL");
const { isWriter } = require("../Services/MySQL/PostService");

const CustomError = require("../Util/custom-error");
const { isPropertyDefined } = require("../Util/function");

const PostController = {
  createPost: async (req, res, next) => {
    const userId = req.user.id;
    const { boardId, title, content, imageUrl } = req.body;

    try {
      if (!(await isPropertyDefined(boardId, title, content, imageUrl)))
        throw new CustomError(400, "필수 요소가 존재하지 않습니다.");

      let haveImage = 1;
      if (Object.keys(imageUrl).length === 0) haveImage = 0;

      const post = await PostService.createPost(
        userId,
        boardId,
        title,
        content,
        haveImage
      );

      postId = post.dataValues.id;

      if (haveImage == 1) {
        await ImageService.addImageAboutPost(postId, imageUrl);
      }

      res.status(200).json({
        code: 200,
        message: "게시글 생성 성공했습니다",
        result: post,
      });
    } catch (err) {
      next(err);
    }
  },

  modifyPost: async (req, res, next) => {
    const userId = req.user.id;
    const { postId } = req.params;
    const { boardId, title, content, imageUrl } = req.body;

    try {
      if (!(await isWriter(userId, postId))) {
        throw new CustomError(440, "자신의 게시글이 아닙니다.");
      }

      if (!(await isPropertyDefined(boardId, title, content))) {
        throw new CustomError(400, "필수요소가 없습니다.");
      }

      let haveImage = 1;
      if (Object.keys(imageUrl).length === 0) haveImage = 0;

      await PostService.modifyPost(postId, boardId, title, content, haveImage);

      await ImageService.deleteImageAboutPost(postId);

      if (haveImage == 1)
        await ImageService.addImageAboutPost(postId, imageUrl);

      res.status(200).json({
        code: 200,
        message: "게시글 수정에 성공했습니다",
      });
    } catch (err) {
      next(err);
    }
  },

  deletePost: async (req, res, next) => {
    const userId = req.user.id;
    const { postId } = req.params;

    try {
      if (!(await isWriter(userId, postId))) {
        throw new CustomError(440, "자신의 게시글이 아닙니다");
      }
    } catch (err) {
      next(err);
    }
  },

  getPostInBoard: async (req, res, next) => {
    const { boardId } = req.params;

    try {
      if (!(await isPropertyDefined(boardId)))
        throw new CustomError(400, "필수 요소가 존재하지 않습니다.");

      const postInBoard = await PostService.getPostInBoard(boardId);

      res.status(200).json({
        code: 200,
        message: "게시판 내 게시글 조회 성공",
        result: postInBoard,
      });
    } catch (err) {
      next(err);
    }
  },

  getPost: async (req, res, next) => {},
};

module.exports = PostController;
