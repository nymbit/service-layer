const userRole = (sequelize, DataTypes) => {
  const UserRole = sequelize.define(
    "userRole",
    {
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          isUppercase: {
            args: true,
            msg: "User roles must be uppercase.",
          },
        },
      },
    },
    {
      timestamps: false,
    }
  );

  UserRole.associate = (models) => {
    UserRole.belongsTo(models.User);
  };

  return UserRole;
};

module.exports = userRole;
