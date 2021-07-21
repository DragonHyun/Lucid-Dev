const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('sleep', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      comment: "수면인덱스"
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
    start_at: {
      type: DataTypes.DATE,
      allowNull: false,
      comment: "시작시간"
    },
    end_at: {
      type: DataTypes.DATE,
      allowNull: false,
      comment: "종료시간"
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
    tableName: 'sleep',
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
        name: "FK_sleep_user_id_user_id",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
    ]
  });
};
