const { GraphQLDateTime } = require("graphql-iso-date");

const userResolvers = require("./user");
const userRoleResolvers = require("./userRole");
const userAttachmentResolvers = require("./userAttachment");
const accountResolvers = require("./account");
const paymentMethodResolvers = require("./paymentMethod");

const customScalarResolver = {
  Date: GraphQLDateTime,
};

module.exports = [
  customScalarResolver,
  userResolvers,
  userRoleResolvers,
  userAttachmentResolvers,
  accountResolvers,
  paymentMethodResolvers
];
