const User = require("../../Models/MySQL").user;
const sequelize = require("sequelize");

const userService = {
  allUser: async () => {
    try {
      const allUser = await User.findAll();

      return allUser;
    } catch (exception) {
      next(exception);
    }
  },

  signUp: async (
    account_id,
    password,
    name,
    age,
    sex,
    email,
    nickname,
    profile_image_url
  ) => {
    try {
      const user = await User.create({
        account_id: account_id,
        password: password,
        name: name,
        age: age,
        sex: sex,
        email: email,
        nickname: nickname,
        profile_image_url: profile_image_url,
      });

      return user;
    } catch (exception) {
      console.log(exception);
      throw exception;
    }
  },
};

module.exports = userService;
