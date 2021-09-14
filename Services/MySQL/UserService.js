const User = require("../../Models/MySQL").user;
const sequelize = require("sequelize");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const userService = {
  isEmailUnique: async (value) => {
    try {
      const result = await User.findOne({
        attributes: [[sequelize.fn("COUNT", sequelize.col("id")), "count"]],
        where: {
          email: value,
          deleted_at: null,
        },
      });

      if (result.dataValues.count !== 0) {
        return false;
      }
      return true;
    } catch (err) {
      throw err;
    }
  },

  isNicknameUnique: async (value) => {
    try {
      const result = await User.findOne({
        attributes: [[sequelize.fn("COUNT", sequelize.col("id")), "count"]],
        where: {
          nickname: value,
          deleted_at: null,
        },
      });

      if (result.dataValues.count !== 0) {
        return false;
      }
      return true;
    } catch (err) {
      throw err;
    }
  },

  allUser: async () => {
    try {
      const allUser = await User.findAll({
        where: { deleted_at: null },
      });

      return allUser;
    } catch (err) {
      throw err;
    }
  },

  signUp: async (email, password, nickname, age, gender) => {
    try {
      const defaultProfileImageUrl = "imageUrl.com";
      const salt = await bcrypt.genSalt(saltRounds);
      const hashPassword = await bcrypt.hash(password, salt);

      const user = await User.create({
        email: email,
        password: hashPassword,
        nickname: nickname,
        age: age,
        gender: gender,
        profile_image_url: defaultProfileImageUrl,
      });

      return user;
    } catch (err) {
      throw err;
    }
  },

  modifyUserPassword: async (userID, password) => {
    try {
      const salt = await bcrypt.genSalt(saltRounds);
      const hashPassword = await bcrypt.hash(password, salt);

      await User.update(
        { password: hashPassword },
        {
          where: { id: userID },
        }
      );

      return true;
    } catch (err) {
      throw err;
    }
  },

  modifyUserNickname: async (userID, nickname) => {
    try {
      await User.update(
        { nickname: nickname },
        {
          where: { id: userID },
        }
      );

      return true;
    } catch (err) {
      throw err;
    }
  },

  modifyUserProfileImageUrl: async (userID, profileImageUrl) => {
    try {
      await User.update(
        { profile_image_url: profileImageUrl },
        {
          where: { id: userID },
        }
      );

      return true;
    } catch (err) {
      throw err;
    }
  },

  deleteUser: async (userID) => {
    try {
      await User.update({ deleted_at: new Date() }, { where: { id: userID } });

      return true;
    } catch (err) {
      throw err;
    }
  },
};

module.exports = userService;
