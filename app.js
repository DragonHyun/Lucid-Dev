const createError = require("http-errors");
const errorHandler = require("./Middleware/error-handler");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const passport = require("passport");
const passportConfig = require("./Util/passport");
const { swaggerUi, specs } = require("./Swagger");

require("dotenv").config();

const routes = require("./Routes");

const app = express();

if (process.env.NODE_ENV != "test") {
  app.use(logger("dev"));
}
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(passport.initialize());
passportConfig();

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
app.use(routes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
// app.use(function (err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get("env") === "development" ? err : {};

//   // render the error page
//   res.status(err.status || 500);
// });
app.use(errorHandler);

module.exports = app;
