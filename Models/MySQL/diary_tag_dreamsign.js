const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('diary_tag_dreamsign', {
    diary_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      comment: "일기인덱스",
      references: {
        model: 'diary',
        key: 'id'
      }
    },
    dreamsign_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      comment: "꿈표식인덱스",
      references: {
        model: 'dreamsign',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'diary_tag_dreamsign',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "diary_id" },
          { name: "dreamsign_id" },
        ]
      },
      {
        name: "FK_diary_tag_dreamsign_dreamsign_id_dreamsign_id",
        using: "BTREE",
        fields: [
          { name: "dreamsign_id" },
        ]
      },
    ]
  });
};
