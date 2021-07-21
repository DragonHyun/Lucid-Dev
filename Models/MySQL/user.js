const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      comment: "유저인덱스"
    },
    account_id: {
      type: DataTypes.STRING(45),
      allowNull: false,
      comment: "아이디"
    },
    password: {
      type: DataTypes.STRING(45),
      allowNull: false,
      comment: "비밀번호"
    },
    name: {
      type: DataTypes.STRING(45),
      allowNull: false,
      comment: "이름"
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "나이"
    },
    sex: {
      type: DataTypes.ENUM('M','W','U'),
      allowNull: false,
      comment: "성별"
    },
    email: {
      type: DataTypes.STRING(45),
      allowNull: false,
      comment: "이메일주소"
    },
    nickname: {
      type: DataTypes.STRING(45),
      allowNull: false,
      comment: "닉네임"
    },
    profile_image_url: {
      type: DataTypes.TEXT,
      allowNull: false,
      comment: "프로필이미지"
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
    tableName: 'user',
    hasTrigger: true,
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
    ]
  });
};
