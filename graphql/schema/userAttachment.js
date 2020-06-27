const { gql } = require('apollo-server-express');

const userAttachment = gql`
extend type Mutation {
  createUserAttachment(
    name: String!
    downloadURL: String!
    userId: Int!
  ): UserAttachment!
  deleteUserAttachment(id: ID!): Boolean!
}

type UserAttachment {
  name: String!
  downloadURL: String!
}
`;

module.exports = userAttachment