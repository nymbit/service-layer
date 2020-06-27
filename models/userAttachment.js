const userAttachment = (sequelize, DataTypes) => {
    const UserAttachment = sequelize.define(
      "userAttachment",
      {
        downloadURL: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            notEmpty: true,
            isUrl: true
          },
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
              notEmpty: true
            },
          },
      }
    );
  
    UserAttachment.associate = (models) => {
        UserAttachment.belongsTo(models.User);
    };
  
    return UserAttachment;
  };
  
  module.exports = userAttachment;
  