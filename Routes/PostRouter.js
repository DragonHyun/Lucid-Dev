const express = require("express");
const router = express.Router();
const passport = require("passport");

const { PostController } = require("../Controllers");

//passport.authenticate("jwt", { session: false }),

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  PostController.createPost
);
router.patch(
  "/:postId",
  passport.authenticate("jwt", { session: false }),
  PostController.modifyPost
);
router.delete(
  "/:postId",
  passport.authenticate("jwt", { session: false }),
  PostController.deletePost
);
router.get("/board/:boardId", PostController.getPostInBoard);
router.get("/:postId", PostController.getPost);

module.exports = router;
