module.exports = {
  // property들이 정의 되어있는지 확인.
  isPropertyDefined: async (...properties) => {
    try {
      for (let i in properties) {
        let property = properties[i];

        if (property === undefined || property === null || property === "")
          return false;
      }
      return true;
    } catch (err) {
      next(err);
    }
  },

  responseForm: (res, code, message, result) => {
    if (result === undefined) {
      return res.status(code).json({
        code: code,
        message: message,
      });
    } else {
      return res.status(code).json({
        code: code,
        message: message,
        result: result,
      });
    }
  },
};
