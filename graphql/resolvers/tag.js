const { combineResolvers } = require("graphql-resolvers");
const { omit } = require("lodash");
const {
  isAuthenticated,
  isAdmin,
  isTagOwner,
  isPaymentMethodOwner,
} = require("./authorization");

const resolvers = {
  Query: {
    tags: combineResolvers(
      isAuthenticated,
      isAdmin,
      async (parent, args, { models }) => {
        return await models.Tag.findAll();
      }
    ),
    tag: combineResolvers(
      isAuthenticated,
      async (parent, { id }, { models }) => {
        return await models.Tag.findByPk(id);
      }
    ),
  },
  Mutation: {
    createTag: combineResolvers(
      isAuthenticated,
      isPaymentMethodOwner,
      async (
        parent,
        { paymentMethodId, name },
        { currentUser: { id }, models }
      ) => {
        const account = await models.Account.findOne({ where: { userId: id } });
        return await models.Tag.create({
          accountId: account.id,
          paymentMethodId,
          name,
        });
      }
    ),
    updateTag: combineResolvers(
      isAuthenticated,
      isTagOwner,
      async (parent, args, { models }) => {
        const result = await models.Tag.update(omit(args, "id"), {
          where: {
            id: args.id,
          },
          returning: true,
          plain: true,
        });
        return result[1].dataValues;
      }
    ),
    deleteTag: combineResolvers(
      isAuthenticated,
      isTagOwner,
      async (parent, { id }, { models }) => {
        return await models.Tag.destroy({
          where: { id },
        });
      }
    ),
  },
};

module.exports = resolvers;
