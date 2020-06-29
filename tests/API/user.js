const axios = require("axios");

const API_URL = "http://localhost:8000/graphql";

const signUp = async (variables) =>
  axios.post(API_URL, {
    query: `
      mutation ($password: String!, $email: String!, $firstName: String!, $lastName: String!, $cellNumber: String!, $birthDate: String!) {
        signUp(password: $password, email: $email, firstName: $firstName, lastName: $lastName, cellNumber: $cellNumber, birthDate: $birthDate) {
          token
        }
      }
    `,
    variables,
  });

const signIn = async (variables) =>
  axios.post(API_URL, {
    query: `
      mutation ($email: String!, $password: String!) {
        signIn(email: $email, password: $password) {
          token
        }
      }
    `,
    variables,
  });

const deleteUser = async (variables, token) =>
  axios.post(
    API_URL,
    {
      query: `
        mutation ($id: ID!) {
          deleteUser(id: $id)
        }
      `,
      variables,
    },
    {
      headers: {
        "x-token": token,
      },
    }
  );

const getUser = async (variables) =>
  axios.post(API_URL, {
    query: `
      query ($id: ID!) {
        user(id: $id) {
          id
          email
        }
      }
    `,
    variables,
  });

module.exports = { signIn, deleteUser, getUser, signUp };
