const { combineResolvers } = require("graphql-resolvers");
const { isAuthenticated } = require("./authorization");

const resolvers = {
  Mutation: {
    createUserRole: combineResolvers(
      isAuthenticated,
      async (parent, { role, userId }, { models }) => {
        return await models.UserRole.create({
          role,
          userId
        });
      }
    ),
    deleteUserRole: combineResolvers(
      isAuthenticated,
      async (parent, { id }, { models }) => {
        return await models.UserRole.destroy({
          where: { id },
        });
      }
    ),
  },
};

module.exports = resolvers;
