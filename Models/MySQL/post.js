const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('post', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      comment: "게시글인덱스"
    },
    board_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "게시판인덱스",
      references: {
        model: 'board',
        key: 'id'
      }
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
    tableName: 'post',
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
        name: "FK_post_board_id_board_id",
        using: "BTREE",
        fields: [
          { name: "board_id" },
        ]
      },
      {
        name: "FK_post_user_id_user_id",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
    ]
  });
};
