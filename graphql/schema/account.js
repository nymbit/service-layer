const { gql } = require("apollo-server-express");

const user = gql`
  extend type Query {
    accounts: [Account!]
    account(id: ID!): Account
  }

  extend type Mutation {
    deleteAccount(id: ID!): Boolean!
  }

  type Account {
    id: ID!
    user: User!
    paymentMethods: [PaymentMethod!]
  }
`;

module.exports = user
