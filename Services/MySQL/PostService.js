const Post = require("../../Models/MySQL").post;
const sequelize = require("sequelize");

const postService = {
  isWriter: async (userId, postId) => {
    try {
      const post = await Post.findAll({
        where: [{ user_id: userId }, { id: postId }, { deleted_at: null }],
      });

      if (!post) return false;

      return true;
    } catch (err) {
      throw err;
    }
  },

  getPostInBoard: async (boardId) => {
    try {
      const postInBoard = await Post.findAll({
        attributes: [
          "id",
          "user_id",
          "title",
          "content",
          "have_image",
          "created_at",
          "updated_at",
        ],
        where: { board_id: boardId },
        order: [["created_at", "DESC"]],
      });

      return postInBoard;
    } catch (err) {
      throw err;
    }
  },
  createPost: async (userId, boardId, title, content, haveImage) => {
    try {
      const post = await Post.create({
        user_id: userId,
        board_id: boardId,
        title: title,
        content: content,
        have_image: haveImage,
      });

      return post;
    } catch (err) {
      throw err;
    }
  },

  modifyPost: async (postId, boardId, title, content, haveImage) => {
    try {
      const post = await Post.update(
        {
          board_id: boardId,
          title: title,
          content: content,
          haveImage: haveImage,
          updated_at: new Date(),
        },
        {
          where: { id: postId },
        }
      );
    } catch (err) {
      throw err;
    }
  },
};

module.exports = postService;
