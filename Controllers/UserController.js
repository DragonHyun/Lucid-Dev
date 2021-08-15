const { UserService } = require("../Services/MySQL");
const passport = require("passport");
const jwt = require("../Util/jwt");

const CustomError = require("../Util/custom-error");
const { isPropertyDefined } = require("../Util/function");

const UserController = {
  allUser: async (req, res, next) => {
    try {
      const allUser = await UserService.allUser();
      res.status(200).json({
        isSuccess: true,
        code: 200,
        message: "모든 사용자 정보 조회 성공",
        result: allUser,
      });
    } catch (err) {
      next(err);
    }
  },

  signUp: async (req, res, next) => {
    const { email, password, nickname, age, sex } = req.body;

    try {
      if (!(await isPropertyDefined(email, password, nickname, age, sex)))
        throw new CustomError(401, "필수 요소가 존재하지 않습니다.");

      const user = await UserService.signUp(
        email,
        password,
        nickname,
        age,
        sex
      );

      res.status(200).json({
        isSuccess: true,
        code: 200,
        message: "회원가입 성공",
        result: user,
      });
    } catch (err) {
      next(err);
    }
  },
};

module.exports = UserController;
