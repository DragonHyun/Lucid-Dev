const User = require("../../Models/MySQL").user;
const sequelize = require("sequelize");

const userService = {
  allUser: async () => {
    try {
      const allUser = await User.findAll();

      return allUser;
    } catch (err) {
      throw err;
    }
  },

  signUp: async (email, password, nickname, age, sex) => {
    try {
      const defaultProfileImageUrl = "imageUrl.com";

      const user = await User.create({
        email: email,
        password: password,
        nickname: nickname,
        age: age,
        sex: sex,
        profile_image_url: defaultProfileImageUrl,
      });

      return user;
    } catch (exception) {
      console.log(exception);
      throw exception;
    }
  },
};

module.exports = userService;
