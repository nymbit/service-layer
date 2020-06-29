const { gql } = require("apollo-server-express");

const paymentMethod = gql`
  extend type Mutation {
    createPaymentMethod(
      name: String!
      token: String!
    ): PaymentMethod!

    updatePaymentMethod(id: ID!, name: String, token: String): PaymentMethod!

    deletePaymentMethod(id: ID!): Boolean!
  }

  type PaymentMethod {
    id: ID!
    name: String!
    token: String!
  }
`;

module.exports = paymentMethod
