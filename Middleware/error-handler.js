const CustomError = require("../Util/custom-error");

module.exports = (err, req, res, next) => {
  if (process.env.NODE_ENV != "test") {
    console.log(err);
  }
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
    return res.status(400).json({
      code: err.code,
      message: err.message,
    });
  }

  return res.status(err.status).json(errObj);
};
