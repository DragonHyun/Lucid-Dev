const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('post_hit', {
    post_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      comment: "게시글인덱스",
      references: {
        model: 'post',
        key: 'id'
      }
    },
    hit: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "조회수"
    }
  }, {
    sequelize,
    tableName: 'post_hit',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "post_id" },
        ]
      },
    ]
  });
};
