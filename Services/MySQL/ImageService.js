const Image = require("../../Models/MySQL").image;
const sequelize = require("sequelize");

const imageService = {
  addImageAboutPost: async (postId, imageUrl) => {
    const type = "post";
    try {
      const result = await imageUrl.map(async (image) => {
        await Image.create({
          target_id: postId,
          type: type,
          image_url: image,
        });
      });
    } catch (err) {
      throw err;
    }
  },

  deleteImageAboutPost: async (postId) => {
    const type = "post";
    try {
      const result = await Image.update(
        {
          deleted_at: new Date(),
        },
        {
          where: [{ target_id: postId }, { type: type }],
        }
      );
    } catch (err) {
      throw err;
    }
  },
};

module.exports = imageService;
