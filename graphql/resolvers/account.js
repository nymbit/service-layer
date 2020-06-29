const { combineResolvers } = require("graphql-resolvers");
const { isAuthenticated, isAccountOwner, isAdmin } = require("./authorization");

const resolvers = {
  Query: {
    accounts: combineResolvers(
      isAuthenticated,
      isAdmin,
      async (parent, args, { models }) => {
        return await models.Account.findAll();
      }
    ),
    account: combineResolvers(
      isAuthenticated,
      isAccountOwner,
      async (parent, { id }, { models }) => {
        return await models.Account.findByPk(id);
      }
    ),
  },

  Account: {
    user: async (account, args, { models }) => {
      return await models.User.findByPk(account.userId);
    },
    paymentMethods: async (account, args, { models }) => {
      return await models.PaymentMethod.findAll({
        where: {
          accountId: account.id,
        },
      });
    },
  },
};

module.exports = resolvers;
