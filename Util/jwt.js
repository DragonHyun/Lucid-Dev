const jwt = require("jsonwebtoken");
const { secretKey, options } = require("../config/secretkey");
const TOKEN_EXPIRED = -3;
const TOKEN_INVALID = -2;

module.exports = {
  createToken: async (user) => {
    const payload = {
      id: user.id,
      email: user.email,
    };

    const result = {
      token: jwt.sign(payload, secretKey, options),
    };

    return result.token;
  },

  VerifyToken: async (token) => {
    try {
      const decoded = jwt.verify(token, secretKey);
    } catch (err) {
      if (err.message === "jwt expired") {
        return TOKEN_EXPIRED;
      } else if (err.message === "invalid token") {
        return TOKEN_INVALID;
      } else {
        return TOKEN_INVALID;
      }
    }

    return decoded;
  },
};
