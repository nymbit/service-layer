const { combineResolvers } = require("graphql-resolvers");
const {
  isAuthenticated,
  isAccountOwner,
  isPaymentMethodOwner,
} = require("./authorization");

const resolvers = {
  Query: {
    paymentMethods: combineResolvers(
      isAuthenticated,
      isAccountOwner,
      async (parent, { accountId }, { models }) => {
        return await models.PaymentMethod.findAll({ where: { accountId } });
      }
    ),
  },
  Mutation: {
    createPaymentMethod: combineResolvers(
      isAuthenticated,
      async (parent, { name, token }, { currentUser: { id }, models }) => {
        const account = models.Account.findOne({ where: { userId: id } });
        return await models.PaymentMethod.create({
          accountId: account,
          name,
          token,
        });
      }
    ),
    updatePaymentMethod: combineResolvers(
      isAuthenticated,
      isPaymentMethodOwner,
      async (parent, { id, name, token }, { models }) => {
        return await models.PaymentMethod.update(
          {
            name,
            token,
          },
          {
            where: {
              id,
            },
          }
        );
      }
    ),
    deletePaymentMethod: combineResolvers(
      isAuthenticated,
      isPaymentMethodOwner,
      async (parent, { id }, { models }) => {
        return await models.PaymentMethod.destroy({
          where: { id },
        });
      }
    ),
  },
};

module.exports = resolvers;
