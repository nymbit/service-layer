//guarding resolver or resolver middleware

const { ForbiddenError } = require("apollo-server");
const { combineResolvers, skip } = require("graphql-resolvers");

const isAuthenticated = (parent, args, { currentUser }) =>
  currentUser ? skip : new ForbiddenError("Not an authorized user.");

const isAdmin = combineResolvers(
  isAuthenticated,
  (parent, args, { currentUser: { role } }) =>
    role === "ADMIN"
      ? skip
      : new ForbiddenError("Restricted to users with ADMIN rights.")
);

module.exports = { isAuthenticated, isAdmin };
