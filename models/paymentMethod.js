const paymentMethod = (sequelize, DataTypes) => {
  const PaymentMethod = sequelize.define("paymentMethod", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  });

  PaymentMethod.associate = (models) => {
    PaymentMethod.belongsTo(models.Account);
    PaymentMethod.hasMany(models.Tag);
  };

  return PaymentMethod;
};

module.exports = paymentMethod;
