const { combineResolvers } = require("graphql-resolvers");
const { isAuthenticated } = require("./authorization");

const resolvers = {
  Mutation: {
    createUserAttachment: combineResolvers(
      isAuthenticated,
      async (parent, { name, downloadURL, userId }, { models }) => {
        return await models.UserAttachment.create({
          name,
          downloadURL,
          userId
        });
      }
    ),
    deleteUserAttachment: combineResolvers(
      isAuthenticated,
      async (parent, { id }, { models }) => {
        return await models.UserAttachment.destroy({
          where: { id },
        });
      }
    ),
  },
};

module.exports = resolvers;
