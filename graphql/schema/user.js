const { gql } = require("apollo-server-express");

const user = gql`
  extend type Query {
    users: [User!]
    user(id: ID!): User
    currentUser: User
  }

  extend type Mutation {
    signUp(
      username: String!
      email: String!
      password: String!
      firstName: String!
      lastName: String!
      cellNumber: String!
      birthDate: Date!
    ): Token!

    signIn(login: String!, password: String!): Token!

    deleteUser(id: ID!): Boolean!
  }

  type Token {
    token: String!
  }

  type User {
    id: ID!
    username: String!
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
