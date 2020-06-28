const { gql } = require("apollo-server-express");

const tag = gql`
  extend type Query {
    tags: [Tag!]
    tag(id: ID!): Tag
  }

  extend type Mutation {
    createTag(
      paymentMethodId: String!
      name: String!
    ): Tag!

    updateTag(paymentMethodId: String, name: String, blocked: Boolean): Tag!

    deleteTag(id: ID!): Boolean!
  }

  type Tag {
    id: ID!
    account: Account!
    paymentMethod: PaymentMethod!
    name: String!
    uuid: String!
    blocked: Boolean!
  }
`;

module.exports = tag
