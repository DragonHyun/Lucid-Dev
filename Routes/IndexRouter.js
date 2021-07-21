const express = require("express");
const router = express.Router();

const { IndexController } = require("../Controllers");

router.get("/", IndexController.isSuccess);

module.exports = router;
