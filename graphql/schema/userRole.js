const { gql } = require('apollo-server-express');

const userRole = gql`
extend type Mutation {
  createUserRole(role: String!, userId: Int!): UserRole!
  deleteUserRole(id: ID!): UserRole!
}

type UserRole {
  role: String!
}
`;

module.exports = userRole