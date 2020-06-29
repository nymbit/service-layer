const { gql } = require("apollo-server-express");

const user = gql`
  extend type Query {
    users: [User!]
    user(id: ID!): User
    currentUser: User
  }

  extend type Mutation {
    signUp(
      email: String!
      password: String!
      firstName: String!
      lastName: String!
      cellNumber: String!
      birthDate: String!
      role: String
    ): Token!

    signIn(email: String!, password: String!): Token!

    deleteUser(id: ID!): Boolean!
  }

  type Token {
    token: String!
  }

  type User {
    id: ID!
    email: String!
    firstName: String!
    lastName: String!
    cellNumber: String!
    birthDate: Date!
    roles: [UserRole!]
    attachments: [UserAttachment]
  }
`;

module.exports = user
