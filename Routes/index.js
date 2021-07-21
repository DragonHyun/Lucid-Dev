const express = require("express");
const router = express.Router();

const IndexRouter = require("./IndexRouter");
const UserRouter = require("./UserRouter");
const BoardRouter = require("./BoardRouter");
const PostRouter = require("./PostRouter");

router.use("/", IndexRouter);
router.use("/user", UserRouter);
router.use("/board", BoardRouter);
router.use("/post", PostRouter);

module.exports = router;
