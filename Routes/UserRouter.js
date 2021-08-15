const express = require("express");
const router = express.Router();

const { UserController } = require("../Controllers");

router.get("/", UserController.allUser);
router.post("/", UserController.signUp);

module.exports = router;
