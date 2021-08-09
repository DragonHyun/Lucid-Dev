const CustomError = require("../Util/custom-error");

module.exports = (err, req, res, next) => {
  console.log(err);
  const errObj = {
    req: {
      headers: req.headers,
      query: req.query,
      body: req.body,
      route: req.route,
    },
    error: {
      message: err.message,
      stack: err.stack,
      status: err.status,
    },
  };

  if (err instanceof CustomError) {
    return res.status(err.code).json({
      isSuccess: false,
      code: err.code,
      message: err.message,
    });
  }

  return res.status(err.status).json(errObj);
};
