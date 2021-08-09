const { Sequelize, DataTypes } = require("sequelize");

/**
 * Actions summary:
 *
 * createTable() => "board", deps: []
 * createTable() => "dreamsign", deps: []
 * createTable() => "image", deps: []
 * createTable() => "report_reason", deps: []
 * createTable() => "user", deps: []
 * createTable() => "post", deps: [board, user]
 * createTable() => "sleep", deps: [user]
 * createTable() => "diary", deps: [user, sleep]
 * createTable() => "bookmark", deps: [post, user]
 * createTable() => "heart", deps: [post, user]
 * createTable() => "post_hit", deps: [post]
 * createTable() => "report", deps: [user, user, report_reason]
 * createTable() => "diary_tag_dreamsign", deps: [diary, dreamsign]
 * addIndex(PRIMARY) => "board"
 * addIndex(PRIMARY) => "bookmark"
 * addIndex(FK_bookmark_post_id_post_id) => "bookmark"
 * addIndex(FK_bookmark_user_id_user_id) => "bookmark"
 * addIndex(PRIMARY) => "diary"
 * addIndex(FK_diary_user_id_user_id) => "diary"
 * addIndex(FK_diary_sleep_id_sleep_id) => "diary"
 * addIndex(PRIMARY) => "diary_tag_dreamsign"
 * addIndex(FK_diary_tag_dreamsign_dreamsign_id_dreamsign_id) => "diary_tag_dreamsign"
 * addIndex(PRIMARY) => "dreamsign"
 * addIndex(PRIMARY) => "heart"
 * addIndex(FK_heart_post_id_post_id) => "heart"
 * addIndex(FK_heart_user_id_user_id) => "heart"
 * addIndex(PRIMARY) => "image"
 * addIndex(PRIMARY) => "post"
 * addIndex(FK_post_board_id_board_id) => "post"
 * addIndex(FK_post_user_id_user_id) => "post"
 * addIndex(PRIMARY) => "post_hit"
 * addIndex(PRIMARY) => "report"
 * addIndex(FK_report_report_reason_id_report_reason_id) => "report"
 * addIndex(FK_report_report_user_id_user_id) => "report"
 * addIndex(FK_report_reported_user_id_user_id) => "report"
 * addIndex(PRIMARY) => "report_reason"
 * addIndex(PRIMARY) => "sleep"
 * addIndex(FK_sleep_user_id_user_id) => "sleep"
 * addIndex(PRIMARY) => "user"
 *
 */

const info = {
  revision: 1,
  name: "TestMigragion",
  created: "2021-08-08T04:53:55.201Z",
  comment: "",
};

const migrationCommands = (transaction) => [
  {
    fn: "createTable",
    params: [
      "board",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          comment: "게시판인덱스",
          primaryKey: true,
          allowNull: false,
          autoIncrement: true,
        },
        board_name: {
          type: Sequelize.STRING(45),
          field: "board_name",
          comment: "게시판이름",
          allowNull: false,
        },
        created_at: {
          type: Sequelize.DATE,
          field: "created_at",
          comment: "생성시점",
          defaultValue: Sequelize.NOW,
          allowNull: false,
        },
        updated_at: {
          type: Sequelize.DATE,
          field: "updated_at",
          comment: "수정시점",
          allowNull: true,
        },
        deleted_at: {
          type: Sequelize.DATE,
          field: "deleted_at",
          comment: "삭제시점",
          allowNull: true,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "dreamsign",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          comment: "꿈표식인덱스",
          primaryKey: true,
          allowNull: false,
          autoIncrement: true,
        },
        dreamsign: {
          type: Sequelize.STRING(45),
          field: "dreamsign",
          comment: "꿈표식",
          allowNull: false,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "image",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          comment: "이미지인덱스",
          primaryKey: true,
          allowNull: false,
          autoIncrement: true,
        },
        target_id: {
          type: Sequelize.INTEGER,
          field: "target_id",
          comment: "타겟인덱스(diary / post)",
          allowNull: false,
        },
        type: {
          type: Sequelize.STRING(5),
          field: "type",
          comment: "타겟타입",
          allowNull: false,
        },
        image_url: {
          type: Sequelize.TEXT,
          field: "image_url",
          comment: "이미지",
          allowNull: false,
        },
        created_at: {
          type: Sequelize.DATE,
          field: "created_at",
          comment: "생성시점",
          defaultValue: Sequelize.NOW,
          allowNull: false,
        },
        updated_at: {
          type: Sequelize.DATE,
          field: "updated_at",
          comment: "수정시점",
          allowNull: true,
        },
        deleted_at: {
          type: Sequelize.DATE,
          field: "deleted_at",
          comment: "삭제시점",
          allowNull: true,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "report_reason",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          comment: "신고사유인덱스",
          primaryKey: true,
          allowNull: false,
          autoIncrement: true,
        },
        reason: {
          type: Sequelize.STRING(45),
          field: "reason",
          comment: "신고사유",
          allowNull: false,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "user",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          comment: "유저인덱스",
          primaryKey: true,
          allowNull: false,
          autoIncrement: true,
        },
        email: {
          type: Sequelize.TEXT,
          field: "email",
          comment: "아이디",
          allowNull: false,
        },
        password: {
          type: Sequelize.STRING(45),
          field: "password",
          comment: "비밀번호",
          allowNull: false,
        },
        nickname: {
          type: Sequelize.STRING(45),
          field: "nickname",
          allowNull: false,
        },
        age: {
          type: Sequelize.INTEGER,
          field: "age",
          comment: "나이",
          allowNull: false,
        },
        sex: {
          type: Sequelize.ENUM("M", "W", "U"),
          field: "sex",
          comment: "성별",
          allowNull: false,
        },
        profile_image_url: {
          type: Sequelize.TEXT,
          field: "profile_image_url",
          comment: "프로필이미지",
          allowNull: false,
        },
        created_at: {
          type: Sequelize.DATE,
          field: "created_at",
          comment: "생성시점",
          defaultValue: Sequelize.NOW,
          allowNull: false,
        },
        updated_at: {
          type: Sequelize.DATE,
          field: "updated_at",
          comment: "수정시점",
          allowNull: true,
        },
        deleted_at: {
          type: Sequelize.DATE,
          field: "deleted_at",
          comment: "삭제시점",
          allowNull: true,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "post",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          comment: "게시글인덱스",
          primaryKey: true,
          allowNull: false,
          autoIncrement: true,
        },
        board_id: {
          type: Sequelize.INTEGER,
          field: "board_id",
          references: { model: "board", key: "id" },
          comment: "게시판인덱스",
          allowNull: false,
        },
        user_id: {
          type: Sequelize.INTEGER,
          field: "user_id",
          references: { model: "user", key: "id" },
          comment: "유저인덱스",
          allowNull: false,
        },
        title: {
          type: Sequelize.TEXT,
          field: "title",
          comment: "제목",
          allowNull: false,
        },
        content: {
          type: Sequelize.TEXT,
          field: "content",
          comment: "내용",
          allowNull: false,
        },
        have_image: {
          type: Sequelize.TINYINT,
          field: "have_image",
          comment: "이미지여부",
          allowNull: false,
        },
        created_at: {
          type: Sequelize.DATE,
          field: "created_at",
          comment: "생성시점",
          defaultValue: Sequelize.NOW,
          allowNull: false,
        },
        updated_at: {
          type: Sequelize.DATE,
          field: "updated_at",
          comment: "수정시점",
          allowNull: true,
        },
        deleted_at: {
          type: Sequelize.DATE,
          field: "deleted_at",
          comment: "삭제시점",
          allowNull: true,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "sleep",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          comment: "수면인덱스",
          primaryKey: true,
          allowNull: false,
          autoIncrement: true,
        },
        user_id: {
          type: Sequelize.INTEGER,
          field: "user_id",
          references: { model: "user", key: "id" },
          comment: "유저인덱스",
          allowNull: false,
        },
        start_at: {
          type: Sequelize.DATE,
          field: "start_at",
          comment: "시작시간",
          allowNull: false,
        },
        end_at: {
          type: Sequelize.DATE,
          field: "end_at",
          comment: "종료시간",
          allowNull: false,
        },
        created_at: {
          type: Sequelize.DATE,
          field: "created_at",
          comment: "생성시점",
          defaultValue: Sequelize.NOW,
          allowNull: false,
        },
        updated_at: {
          type: Sequelize.DATE,
          field: "updated_at",
          comment: "수정시점",
          allowNull: true,
        },
        deleted_at: {
          type: Sequelize.DATE,
          field: "deleted_at",
          comment: "삭제시점",
          allowNull: true,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "diary",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          comment: "일기인덱스",
          primaryKey: true,
          allowNull: false,
          autoIncrement: true,
        },
        user_id: {
          type: Sequelize.INTEGER,
          onUpdate: "CASCADE",
          onDelete: "NO ACTION",
          field: "user_id",
          references: { model: "user", key: "id" },
          comment: "유저인덱스",
          allowNull: false,
        },
        sleep_id: {
          type: Sequelize.INTEGER,
          onUpdate: "CASCADE",
          onDelete: "NO ACTION",
          field: "sleep_id",
          references: { model: "sleep", key: "id" },
          comment: "수면인덱스",
          allowNull: false,
        },
        title: {
          type: Sequelize.TEXT,
          field: "title",
          comment: "제목",
          allowNull: false,
        },
        content: {
          type: Sequelize.TEXT,
          field: "content",
          comment: "내용",
          allowNull: false,
        },
        is_lucid: {
          type: Sequelize.TINYINT,
          field: "is_lucid",
          comment: "루시드여부",
          allowNull: false,
        },
        is_bookmark: {
          type: Sequelize.TINYINT,
          field: "is_bookmark",
          comment: "즐겨찾기여부",
          allowNull: false,
        },
        have_image: {
          type: Sequelize.TINYINT,
          field: "have_image",
          comment: "이미지여부",
          allowNull: false,
        },
        created_at: {
          type: Sequelize.DATE,
          field: "created_at",
          comment: "생성시점",
          defaultValue: Sequelize.NOW,
          allowNull: false,
        },
        updated_at: {
          type: Sequelize.DATE,
          field: "updated_at",
          comment: "수정시점",
          allowNull: true,
        },
        deleted_at: {
          type: Sequelize.DATE,
          field: "deleted_at",
          comment: "삭제시점",
          allowNull: true,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "bookmark",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          comment: "즐겨찾기인덱스",
          primaryKey: true,
          allowNull: false,
          autoIncrement: true,
        },
        post_id: {
          type: Sequelize.INTEGER,
          onUpdate: "CASCADE",
          onDelete: "NO ACTION",
          field: "post_id",
          references: { model: "post", key: "id" },
          comment: "게시글인덱스",
          allowNull: false,
        },
        user_id: {
          type: Sequelize.INTEGER,
          onUpdate: "CASCADE",
          onDelete: "NO ACTION",
          field: "user_id",
          references: { model: "user", key: "id" },
          comment: "유저인덱스",
          allowNull: false,
        },
        created_at: {
          type: Sequelize.DATE,
          field: "created_at",
          comment: "생성시점",
          defaultValue: Sequelize.NOW,
          allowNull: false,
        },
        updated_at: {
          type: Sequelize.DATE,
          field: "updated_at",
          comment: "수정시점",
          allowNull: true,
        },
        deleted_at: {
          type: Sequelize.DATE,
          field: "deleted_at",
          comment: "삭제시점",
          allowNull: true,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "heart",
      {
        age: {
          type: Sequelize.INTEGER,
          field: "age",
          comment: "좋아요인덱스",
          primaryKey: true,
          allowNull: false,
          autoIncrement: true,
        },
        post_id: {
          type: Sequelize.INTEGER,
          onUpdate: "CASCADE",
          onDelete: "NO ACTION",
          field: "post_id",
          references: { model: "post", key: "id" },
          comment: "게시글인덱스",
          allowNull: false,
        },
        user_id: {
          type: Sequelize.INTEGER,
          onUpdate: "CASCADE",
          onDelete: "NO ACTION",
          field: "user_id",
          references: { model: "user", key: "id" },
          comment: "유저인덱스",
          allowNull: false,
        },
        created_at: {
          type: Sequelize.DATE,
          field: "created_at",
          comment: "생성시점",
          defaultValue: Sequelize.NOW,
          allowNull: false,
        },
        updated_at: {
          type: Sequelize.DATE,
          field: "updated_at",
          comment: "수정시점",
          allowNull: true,
        },
        deleted_at: {
          type: Sequelize.DATE,
          field: "deleted_at",
          comment: "삭제시점",
          allowNull: true,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "post_hit",
      {
        post_id: {
          type: Sequelize.INTEGER,
          field: "post_id",
          references: { model: "post", key: "id" },
          comment: "게시글인덱스",
          primaryKey: true,
          allowNull: false,
        },
        hit: {
          type: Sequelize.INTEGER,
          field: "hit",
          comment: "조회수",
          allowNull: false,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "report",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          comment: "신고인덱스",
          primaryKey: true,
          allowNull: false,
          autoIncrement: true,
        },
        report_user_id: {
          type: Sequelize.INTEGER,
          field: "report_user_id",
          references: { model: "user", key: "id" },
          comment: "신고유저인덱스",
          allowNull: false,
        },
        reported_user_id: {
          type: Sequelize.INTEGER,
          field: "reported_user_id",
          references: { model: "user", key: "id" },
          comment: "피신고유저인덱스",
          allowNull: false,
        },
        report_reason_id: {
          type: Sequelize.INTEGER,
          field: "report_reason_id",
          references: { model: "report_reason", key: "id" },
          comment: "신고사유인덱스",
          allowNull: false,
        },
        content: {
          type: Sequelize.TEXT,
          field: "content",
          comment: "신고내용",
          allowNull: false,
        },
        is_complete: {
          type: Sequelize.TINYINT,
          field: "is_complete",
          comment: "처리여부",
          allowNull: false,
        },
        created_at: {
          type: Sequelize.DATE,
          field: "created_at",
          comment: "생성시점",
          defaultValue: Sequelize.NOW,
          allowNull: false,
        },
        updated_at: {
          type: Sequelize.DATE,
          field: "updated_at",
          comment: "수정시점",
          allowNull: true,
        },
        deleted_at: {
          type: Sequelize.DATE,
          field: "deleted_at",
          comment: "삭제시점",
          allowNull: true,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "diary_tag_dreamsign",
      {
        diary_id: {
          type: Sequelize.INTEGER,
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
          unique: "diary_tag_dreamsign_dreamsign_id_diary_id_unique",
          field: "diary_id",
          references: { model: "diary", key: "id" },
          comment: "일기인덱스",
          primaryKey: true,
          allowNull: false,
        },
        dreamsign_id: {
          type: Sequelize.INTEGER,
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
          unique: "diary_tag_dreamsign_dreamsign_id_diary_id_unique",
          field: "dreamsign_id",
          references: { model: "dreamsign", key: "id" },
          comment: "꿈표식인덱스",
          primaryKey: true,
          allowNull: false,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "addIndex",
    params: [
      "bookmark",
      [{ name: "post_id" }],
      {
        indexName: "FK_bookmark_post_id_post_id",
        name: "FK_bookmark_post_id_post_id",
        transaction,
      },
    ],
  },
  {
    fn: "addIndex",
    params: [
      "bookmark",
      [{ name: "user_id" }],
      {
        indexName: "FK_bookmark_user_id_user_id",
        name: "FK_bookmark_user_id_user_id",
        transaction,
      },
    ],
  },
  {
    fn: "addIndex",
    params: [
      "diary",
      [{ name: "user_id" }],
      {
        indexName: "FK_diary_user_id_user_id",
        name: "FK_diary_user_id_user_id",
        transaction,
      },
    ],
  },
  {
    fn: "addIndex",
    params: [
      "diary",
      [{ name: "sleep_id" }],
      {
        indexName: "FK_diary_sleep_id_sleep_id",
        name: "FK_diary_sleep_id_sleep_id",
        transaction,
      },
    ],
  },
  {
    fn: "addIndex",
    params: [
      "diary_tag_dreamsign",
      [{ name: "dreamsign_id" }],
      {
        indexName: "FK_diary_tag_dreamsign_dreamsign_id_dreamsign_id",
        name: "FK_diary_tag_dreamsign_dreamsign_id_dreamsign_id",
        transaction,
      },
    ],
  },
  {
    fn: "addIndex",
    params: [
      "heart",
      [{ name: "post_id" }],
      {
        indexName: "FK_heart_post_id_post_id",
        name: "FK_heart_post_id_post_id",
        transaction,
      },
    ],
  },
  {
    fn: "addIndex",
    params: [
      "heart",
      [{ name: "user_id" }],
      {
        indexName: "FK_heart_user_id_user_id",
        name: "FK_heart_user_id_user_id",
        transaction,
      },
    ],
  },
  {
    fn: "addIndex",
    params: [
      "post",
      [{ name: "board_id" }],
      {
        indexName: "FK_post_board_id_board_id",
        name: "FK_post_board_id_board_id",
        transaction,
      },
    ],
  },
  {
    fn: "addIndex",
    params: [
      "post",
      [{ name: "user_id" }],
      {
        indexName: "FK_post_user_id_user_id",
        name: "FK_post_user_id_user_id",
        transaction,
      },
    ],
  },
  {
    fn: "addIndex",
    params: [
      "report",
      [{ name: "report_reason_id" }],
      {
        indexName: "FK_report_report_reason_id_report_reason_id",
        name: "FK_report_report_reason_id_report_reason_id",
        transaction,
      },
    ],
  },
  {
    fn: "addIndex",
    params: [
      "report",
      [{ name: "report_user_id" }],
      {
        indexName: "FK_report_report_user_id_user_id",
        name: "FK_report_report_user_id_user_id",
        transaction,
      },
    ],
  },
  {
    fn: "addIndex",
    params: [
      "report",
      [{ name: "reported_user_id" }],
      {
        indexName: "FK_report_reported_user_id_user_id",
        name: "FK_report_reported_user_id_user_id",
        transaction,
      },
    ],
  },
  {
    fn: "addIndex",
    params: [
      "sleep",
      [{ name: "user_id" }],
      {
        indexName: "FK_sleep_user_id_user_id",
        name: "FK_sleep_user_id_user_id",
        transaction,
      },
    ],
  },
];

const rollbackCommands = (transaction) => [
  {
    fn: "dropTable",
    params: ["board", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["bookmark", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["diary", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["diary_tag_dreamsign", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["dreamsign", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["heart", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["image", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["post", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["post_hit", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["report", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["report_reason", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["sleep", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["user", { transaction }],
  },
];

const pos = 0;
const useTransaction = true;

const execute = (queryInterface, sequelize, _commands) => {
  let index = pos;
  const run = (transaction) => {
    const commands = _commands(transaction);
    return new Promise((resolve, reject) => {
      const next = () => {
        if (index < commands.length) {
          const command = commands[index];
          console.log(`[#${index}] execute: ${command.fn}`);
          index++;
          queryInterface[command.fn](...command.params).then(next, reject);
        } else resolve();
      };
      next();
    });
  };
  if (useTransaction) return queryInterface.sequelize.transaction(run);
  return run(null);
};

module.exports = {
  pos,
  useTransaction,
  up: (queryInterface, sequelize) =>
    execute(queryInterface, sequelize, migrationCommands),
  down: (queryInterface, sequelize) =>
    execute(queryInterface, sequelize, rollbackCommands),
  info,
};
