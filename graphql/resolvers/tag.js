const { combineResolvers } = require("graphql-resolvers");
const { omit } = require("lodash");
const {
  isAuthenticated,
  isTagOwner,
} = require("./authorization");

const resolvers = {
  Query: {
    tags: combineResolvers(
      isAuthenticated,
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
      async (
        parent,
        { paymentMethodId, name },
        { currentUser: { id }, models }
      ) => {
        const account = models.Account.findOne({ where: { userId: id } });
        return await models.Tag.create({
          accountId: account,
          paymentMethodId,
          name,
        });
      }
    ),
    updateTag: combineResolvers(
      isAuthenticated,
      isTagOwner,
      async (parent, args, { models }) => {
        return await models.Tag.update(omit(args, "id"), {
          where: {
            id: args.id,
          },
        });
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
