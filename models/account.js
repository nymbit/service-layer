const account = (sequelize) => {
  const Account = sequelize.define("account");

  Account.associate = (models) => {
    Account.belongsTo(models.User);
    Account.hasMany(models.Tag, { onDelete: "CASCADE" });
    Account.hasMany(models.PaymentMethod, { onDelete: "CASCADE" });
  };

  return Account;
};

module.exports = account;
