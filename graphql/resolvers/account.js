const { combineResolvers } = require("graphql-resolvers");
const { isAuthenticated } = require("./authorization");

const resolvers = {
  Query: {
    accounts: combineResolvers(isAuthenticated, async (parent, args, { models }) => {
      return await models.Account.findAll();
    }),
    account: combineResolvers(isAuthenticated, async (parent, { id }, { models }) => {
      return await models.Account.findByPk(id);
    }),
  },

  Account: {
    user: async (account, args, { models }) => {
      return await models.User.findByPk(account.userId);
    },
  },
};

module.exports = resolvers;
