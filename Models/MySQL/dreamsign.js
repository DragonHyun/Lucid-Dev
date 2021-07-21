const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('dreamsign', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      comment: "꿈표식인덱스"
    },
    dreamsign: {
      type: DataTypes.STRING(45),
      allowNull: false,
      comment: "꿈표식"
    }
  }, {
    sequelize,
    tableName: 'dreamsign',
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
