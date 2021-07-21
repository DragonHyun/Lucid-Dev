const IndexController = {
  isSuccess: (req, res, next) => {
    res.status(200).json({
      isSuccess: true,
      code: 200,
      message: "성공하였습니다",
    });
  },
};

module.exports = IndexController;
