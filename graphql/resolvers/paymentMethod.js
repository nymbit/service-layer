const { combineResolvers } = require("graphql-resolvers");
const { omit } = require("lodash");
const { isAuthenticated, isPaymentMethodOwner } = require("./authorization");

const resolvers = {
  Mutation: {
    createPaymentMethod: combineResolvers(
      isAuthenticated,
      async (parent, { name, token }, { currentUser: { id }, models }) => {
        const account = await models.Account.findOne({ where: { userId: id } });
        return await models.PaymentMethod.create({
          accountId: account.id,
          name,
          token,
        });
      }
    ),
    updatePaymentMethod: combineResolvers(
      isAuthenticated,
      isPaymentMethodOwner,
      async (parent, args, { models }) => {
        const result = await models.PaymentMethod.update(omit(args, "id"), {
          where: {
            id: args.id,
          },
          returning: true,
          plain: true,
        });
        return result[1].dataValues;
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
