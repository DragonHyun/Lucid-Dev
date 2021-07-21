const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('board', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      comment: "게시판인덱스"
    },
    board_name: {
      type: DataTypes.STRING(45),
      allowNull: false,
      comment: "게시판이름"
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
    tableName: 'board',
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
