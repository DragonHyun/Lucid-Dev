const passport = require("passport");
const passportJWT = require("passport-jwt");

const bcrypt = require("bcrypt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const LocalStrategy = require("passport-local").Strategy;

const User = require("../Models/MySQL").user;
const { secretKey, options } = require("../config/secretkey");

const LocalStrategyOption = {
  usernameField: "email",
  passwordField: "password",
};

const localVerify = async (email, password, done) => {
  try {
    const user = await User.findOne({ where: { email: email } });
    if (!user)
      return done(null, false, { message: "아이디가 존재 하지 않습니다." });

    const isSamePassword = await bcrypt.compare(password, user.password);
    if (!isSamePassword)
      return done(null, false, { message: "비밀번호가 틀립니다." });

    return done(null, user);
  } catch (err) {
    return done(err);
  }
};

const jwtStrategyOption = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: secretKey,
};

async function jwtVerify(payload, done) {
  try {
    const user = await User.findOne({ where: { id: payload.id } });
    if (user) return done(null, user);

    done(null, false, { message: "올바르지 않은 인증정보입니다." });
  } catch (err) {
    return done(err);
  }
}

module.exports = () => {
  passport.use("local", new LocalStrategy(LocalStrategyOption, localVerify));
  passport.use("jwt", new JWTStrategy(jwtStrategyOption, jwtVerify));
};
