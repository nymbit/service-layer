const axios = require("axios");

const API_URL = "http://localhost:8000/graphql";

const createPaymentMethod = async (variables, token) =>
  axios.post(
    API_URL,
    {
      query: `
      mutation($name: String!, $token: String!) {
        createPaymentMethod(name: $name, token: $token) {
          name
        }
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

const updatePaymentMethod = async (variables, token) =>
  axios.post(
    API_URL,
    {
      query: `
      mutation($id: ID!, $name: String) {
        updatePaymentMethod(id: $id, name: $name) {
          name
        }
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

const deletePaymentMethod = async (variables, token) =>
  axios.post(
    API_URL,
    {
      query: `
      mutation($id: ID!, $name: String) {
        deletePaymentMethod(id: $id) 
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

module.exports = { createPaymentMethod, updatePaymentMethod, deletePaymentMethod };
