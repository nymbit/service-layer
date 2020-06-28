const tag = (sequelize, DataTypes) => {
  const Tag = sequelize.define("tag", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    uuid: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: sequelize.UUIDV4,
      validate: {
        notEmpty: true,
        isUUID: 4 //type 4
      },
    },
    blocked: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
  });

  Tag.associate = (models) => {
    Tag.belongsTo(models.Account)
  };

  return Tag;
};

module.exports = tag;
