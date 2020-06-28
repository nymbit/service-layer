const { gql } = require("apollo-server-express");

const linkSchema = gql`
  scalar Date

  type Query {
    _: Boolean
  }
  type Mutation {
    _: Boolean
  }
  type Subscription {
    _: Boolean
  }
`;
module.exports = [
  linkSchema,
  require("./user"),
  require("./userRole"),
  require("./userAttachment"),
  require("./account")
];
