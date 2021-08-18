const express = require("express");
const router = express.Router();

const { BoardController } = require("../Controllers");

router.post("/", BoardController.createBoard);
router.patch("/", BoardController.modifyBoard);
router.delete("/", BoardController.deleteBoard);

router.get("/", BoardController.allBoard);
router.get("/{board_id}/post", BoardController.postOfBoard);
module.exports = router;
