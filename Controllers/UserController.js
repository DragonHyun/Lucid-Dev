const { UserService } = require("../Services/MySQL");
const passport = require("passport");
const jwt = require("../Util/jwt");

const CustomError = require("../Util/custom-error");
const { isPropertyDefined } = require("../Util/function");

const UserController = {
  checkUserPropertyUnique: async (req, res, next) => {
    const { type, value } = req.body;
    let isUnique;
    try {
      if (!(await isPropertyDefined(type, value))) {
        throw new CustomError(400, "필수 요소가 존재하지 않습니다.");
      }

      switch (type) {
        case "email":
          isUnique = await UserService.isEmailUnique(value);
          break;
        case "nickname":
          isUnique = await UserService.isNicknameUnique(value);
          break;
        default:
          throw new CustomError(401, "type이 올바르지 않습니다.");
      }

      res.status(200).json({
        code: 200,
        message: `${type} type unique 여부 확인 성공`,
        result: isUnique,
      });
    } catch (err) {
      next(err);
    }
  },

  allUser: async (req, res, next) => {
    try {
      const allUser = await UserService.allUser();
      res.status(200).json({
        code: 200,
        message: "모든 사용자 정보 조회 성공",
        result: allUser,
      });
    } catch (err) {
      next(err);
    }
  },

  signUp: async (req, res, next) => {
    const { email, password, nickname, age, gender } = req.body;

    try {
      if (!(await isPropertyDefined(email, password, nickname, age, gender))) {
        throw new CustomError(400, "필수 요소가 존재하지 않습니다.");
      }
      if (!(await UserService.isEmailUnique(email))) {
        throw new CustomError(451, "이메일이 중복됩니다.");
      }
      if (!(await UserService.isNicknameUnique(nickname))) {
        throw new CustomError(452, "닉네임이 중복됩니다.");
      }

      const user = await UserService.signUp(
        email,
        password,
        nickname,
        age,
        gender
      );

      res.status(200).json({
        code: 200,
        message: "회원가입 성공",
        result: user,
      });
    } catch (err) {
      next(err);
    }
  },

  signIn: async (req, res, next) => {
    const { email, password } = req.body;

    try {
      if (!(await isPropertyDefined(email, password))) {
        throw new CustomError(400, "필수요소가 없습니다.");
      }

      passport.authenticate("local", { session: false }, (err, user, info) => {
        if (err || !user) {
          return res.status(400).json({
            code: 490,
            message: info.message,
          });
        }

        req.login(user, { session: false }, async (err) => {
          if (err) next(err);

          const token = await jwt.createToken(user);

          return res.status(200).json({
            code: 200,
            message: "login 성공",
            result: token,
          });
        });
      })(req, res);
    } catch (err) {
      next(err);
    }
  },

  modifyUser: async (req, res, next) => {
    const { type, value } = req.body;
    const userID = req.user.id;

    try {
      if (!(await isPropertyDefined(type, value))) {
        throw new CustomError(400, "필수요소가 없습니다.");
      }

      switch (type) {
        case "password":
          await UserService.modifyUserPassword(userID, value);
          break;
        case "nickname":
          if (!(await UserService.isNicknameUnique(value))) {
            throw new CustomError(452, "닉네임이 중복됩니다.");
          }

          await UserService.modifyUserNickname(userID, value);
          break;
        case "profile_image_url":
          await UserService.modifyUserProfileImageUrl(userID, value);
          break;
        default:
          throw new CustomError(401, "type이 올바르지 않습니다.");
      }

      res.status(200).json({
        code: 200,
        message: `${type} 변경에 성공했습니다.`,
      });
    } catch (err) {
      next(err);
    }
  },

  deleteUser: async (req, res, next) => {
    const userID = req.user.id;
    try {
      const isDeleted = await UserService.deleteUser(userID);

      if (!isDeleted) {
        throw new CustomError(403, "회원탈퇴에 실패했습니다.");
      }

      res.status(200).json({
        code: 200,
        message: "회원탈퇴에 성공했습니다.",
      });
    } catch (err) {
      next(err);
    }
  },
};

module.exports = UserController;
