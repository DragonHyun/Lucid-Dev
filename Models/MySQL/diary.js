const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('diary', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      comment: "일기인덱스"
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "유저인덱스",
      references: {
        model: 'user',
        key: 'id'
      }
    },
    sleep_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "수면인덱스",
      references: {
        model: 'sleep',
        key: 'id'
      }
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
      comment: "제목"
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      comment: "내용"
    },
    is_lucid: {
      type: DataTypes.TINYINT,
      allowNull: false,
      comment: "루시드여부"
    },
    is_bookmark: {
      type: DataTypes.TINYINT,
      allowNull: false,
      comment: "즐겨찾기여부"
    },
    have_image: {
      type: DataTypes.TINYINT,
      allowNull: false,
      comment: "이미지여부"
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
      comment: "생성시점"
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true,
      comment: "수정시점"
    },
    deleted_at: {
      type: DataTypes.DATE,
      allowNull: true,
      comment: "삭제시점"
    }
  }, {
    sequelize,
    tableName: 'diary',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "FK_diary_user_id_user_id",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
      {
        name: "FK_diary_sleep_id_sleep_id",
        using: "BTREE",
        fields: [
          { name: "sleep_id" },
        ]
      },
    ]
  });
};
