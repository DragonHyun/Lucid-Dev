const express = require("express");
const router = express.Router();

const { BoardController } = require("../Controllers");

router.post("/", BoardController.createBoard);
router.patch("/:boardId", BoardController.modifyBoard);
router.delete("/:boardId", BoardController.deleteBoard);

router.get("/", BoardController.allBoard);
module.exports = router;
