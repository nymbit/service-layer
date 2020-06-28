const { gql } = require("apollo-server-express");

const user = gql`
  extend type Query {
    accounts: [Account!]
    account(id: ID!): Account
  }

  type Account {
    id: ID!
    user: User!
  }
`;

module.exports = user
