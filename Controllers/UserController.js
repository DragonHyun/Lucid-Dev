const { UserService } = require("../Services/MySQL");

const UserController = {
  allUser: async (req, res, next) => {
    try {
      const allUser = await UserService.allUser();
      res.status(200).json({
        isSuccess: true,
        message: "모든 사용자 정보 조회 성공",
        result: allUser,
      });
    } catch (err) {
      next(err);
    }
  },

  createUser: async (req, res, next) => {
    try {
      const {
        account_id,
        password,
        name,
        age,
        sex,
        email,
        nickname,
        profile_image_url,
      } = req.body;

      await UserService.signUp(
        account_id,
        password,
        name,
        age,
        sex,
        email,
        nickname,
        profile_image_url
      );
      res.status(200).json({
        isSuccess: true,
        code: 200,
        message: "회원가입 성공",
      });
    } catch (err) {
      next(err);
    }
  },
};

module.exports = UserController;
