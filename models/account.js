const account = (sequelize) => {
    const Account = sequelize.define(
      "account"
    );
  
    Account.associate = (models) => {
        Account.belongsTo(models.User);
    };
  
    return Account;
  };
  
  module.exports = account;
  