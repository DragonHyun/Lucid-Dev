"use strict";
const bcrypt = require("bcrypt");
const saltRounds = 10;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    const hashPassword = await bcrypt.hash(
      "abcd1234!",
      await bcrypt.genSalt(saltRounds)
    );

    await queryInterface.bulkInsert("user", [
      {
        email: "duplicate_email@gmail.com",
        password: hashPassword,
        nickname: "duplicate_nickname",
        age: 25,
        gender: "M",
        profile_image_url: "profile_iamge.com",
      },
      {
        email: "test_update_user@gmail.com",
        password: hashPassword,
        nickname: "before_update_nickname",
        age: 20,
        gender: "F",
        profile_image_url: "before_update_profile_image.com",
      },
      {
        email: "test_delete_user@gmail.com",
        password: hashPassword,
        nickname: "test_delete_user",
        age: 21,
        gender: "F",
        profile_image_url: "profile_image.com",
      },
      {
        email: "test_about_post_user@gmail.com",
        password: hashPassword,
        nickname: "test_about_post_user",
        age: 22,
        gender: "M",
        profile_image_url: "profile_image.com",
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete("user", null, {});
  },
};
