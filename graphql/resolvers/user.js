const auth = require("../../utils/authentication");
const { combineResolvers } = require("graphql-resolvers");
const { AuthenticationError, UserInputError } = require("apollo-server");
const { isAdmin } = require("./authorization");

//resolver map
//each resolver has 4 arguments (parent, args, context, info).
//Can inject dependencies for the resolver via context
const resolvers = {
  Query: {
    users: async (parent, args, { models }) => {
      return await models.User.findAll();
    },
    user: async (parent, { id }, { models }) => {
      return await models.User.findByPk(id);
    },
    currentUser: async (parent, args, { models, currentUser }) => {
      return await models.User.findByPk(currentUser.id);
    },
  },

  Mutation: {
    signUp: async (parent, args, { models }) => {
      const user = await models.User.create({
        ...args,
      });

      await models.Account.create({ userId: user.id });

      return { token: auth.createToken(user, "30m") };
    },

    signIn: async (parent, { login, password }, { models }) => {
      const user = await models.User.findByLogin(login); //login is either username or email
      if (!user)
        throw new UserInputError("No user found with these login credentials.");

      if (!(await user.validatePassword(password)))
        throw new AuthenticationError("Invalid password.");

      return { token: auth.createToken(user, "30m") };
    },

    deleteUser: combineResolvers(
      isAdmin,
      async (parent, { id }, { models }) => {
        return await models.User.destroy({
          where: { id },
        });
      }
    ),
  },

  User: {
    roles: async (user, args, { models }) => {
      return await models.UserRole.findAll({
        where: {
          userId: user.id,
        },
      });
    },
    attachments: async (user, args, { models }) => {
      return await models.UserAttachment.findAll({
        where: {
          userId: user.id,
        },
      });
    },
  },
};

module.exports = resolvers;
