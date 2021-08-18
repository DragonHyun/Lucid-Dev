const express = require("express");
const router = express.Router();
const passport = require("passport");

const { UserController } = require("../Controllers");

router.post("/unique", UserController.checkUnique);

router.get("/", UserController.allUser);

router.post("/signup", UserController.signUp);
router.post("/signin", UserController.signIn);

router.patch(
  "/",
  passport.authenticate("jwt", { session: false }),
  UserController.modifyUser
);
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  UserController.deleteUser
);

module.exports = router;
