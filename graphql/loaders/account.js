async function batchAccounts(keys, models) {
    const accounts = await models.Account.findAll({
      where: {
        id: keys,
      },
    });
    return keys.map((key) => accounts.find((account) => account.id === key) || new Error(`No result for ${key}`));
  }
  
  module.exports = batchAccounts;
  