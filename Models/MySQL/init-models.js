var DataTypes = require("sequelize").DataTypes;
var _board = require("./board");
var _bookmark = require("./bookmark");
var _diary = require("./diary");
var _diary_tag_dreamsign = require("./diary_tag_dreamsign");
var _dreamsign = require("./dreamsign");
var _heart = require("./heart");
var _image = require("./image");
var _post = require("./post");
var _post_hit = require("./post_hit");
var _report = require("./report");
var _report_reason = require("./report_reason");
var _sleep = require("./sleep");
var _user = require("./user");

function initModels(sequelize) {
  var board = _board(sequelize, DataTypes);
  var bookmark = _bookmark(sequelize, DataTypes);
  var diary = _diary(sequelize, DataTypes);
  var diary_tag_dreamsign = _diary_tag_dreamsign(sequelize, DataTypes);
  var dreamsign = _dreamsign(sequelize, DataTypes);
  var heart = _heart(sequelize, DataTypes);
  var image = _image(sequelize, DataTypes);
  var post = _post(sequelize, DataTypes);
  var post_hit = _post_hit(sequelize, DataTypes);
  var report = _report(sequelize, DataTypes);
  var report_reason = _report_reason(sequelize, DataTypes);
  var sleep = _sleep(sequelize, DataTypes);
  var user = _user(sequelize, DataTypes);

  diary.belongsToMany(dreamsign, { as: 'dreamsign_id_dreamsigns', through: diary_tag_dreamsign, foreignKey: "diary_id", otherKey: "dreamsign_id" });
  dreamsign.belongsToMany(diary, { as: 'diary_id_diaries', through: diary_tag_dreamsign, foreignKey: "dreamsign_id", otherKey: "diary_id" });
  post.belongsTo(board, { as: "board", foreignKey: "board_id"});
  board.hasMany(post, { as: "posts", foreignKey: "board_id"});
  diary_tag_dreamsign.belongsTo(diary, { as: "diary", foreignKey: "diary_id"});
  diary.hasMany(diary_tag_dreamsign, { as: "diary_tag_dreamsigns", foreignKey: "diary_id"});
  diary_tag_dreamsign.belongsTo(dreamsign, { as: "dreamsign", foreignKey: "dreamsign_id"});
  dreamsign.hasMany(diary_tag_dreamsign, { as: "diary_tag_dreamsigns", foreignKey: "dreamsign_id"});
  bookmark.belongsTo(post, { as: "post", foreignKey: "post_id"});
  post.hasMany(bookmark, { as: "bookmarks", foreignKey: "post_id"});
  heart.belongsTo(post, { as: "post", foreignKey: "post_id"});
  post.hasMany(heart, { as: "hearts", foreignKey: "post_id"});
  post_hit.belongsTo(post, { as: "post", foreignKey: "post_id"});
  post.hasOne(post_hit, { as: "post_hit", foreignKey: "post_id"});
  report.belongsTo(report_reason, { as: "report_reason", foreignKey: "report_reason_id"});
  report_reason.hasMany(report, { as: "reports", foreignKey: "report_reason_id"});
  diary.belongsTo(sleep, { as: "sleep", foreignKey: "sleep_id"});
  sleep.hasMany(diary, { as: "diaries", foreignKey: "sleep_id"});
  bookmark.belongsTo(user, { as: "user", foreignKey: "user_id"});
  user.hasMany(bookmark, { as: "bookmarks", foreignKey: "user_id"});
  diary.belongsTo(user, { as: "user", foreignKey: "user_id"});
  user.hasMany(diary, { as: "diaries", foreignKey: "user_id"});
  heart.belongsTo(user, { as: "user", foreignKey: "user_id"});
  user.hasMany(heart, { as: "hearts", foreignKey: "user_id"});
  post.belongsTo(user, { as: "user", foreignKey: "user_id"});
  user.hasMany(post, { as: "posts", foreignKey: "user_id"});
  report.belongsTo(user, { as: "reported_user", foreignKey: "reported_user_id"});
  user.hasMany(report, { as: "reports", foreignKey: "reported_user_id"});
  report.belongsTo(user, { as: "report_user", foreignKey: "report_user_id"});
  user.hasMany(report, { as: "report_user_reports", foreignKey: "report_user_id"});
  sleep.belongsTo(user, { as: "user", foreignKey: "user_id"});
  user.hasMany(sleep, { as: "sleeps", foreignKey: "user_id"});

  return {
    board,
    bookmark,
    diary,
    diary_tag_dreamsign,
    dreamsign,
    heart,
    image,
    post,
    post_hit,
    report,
    report_reason,
    sleep,
    user,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
