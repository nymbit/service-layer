const axios = require("axios");

const API_URL = "http://localhost:8000/graphql";

const getAccount = async (variables, token) =>
  axios.post(
    API_URL,
    {
      query: `
      query ($id: ID!) {
        account(id: $id) {
          user {
              email
          }
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

const getAccounts = async (token) =>
  axios.post(
    API_URL,
    {
      query: `
      query {
        accounts {
          user {
            email
          }
        }
      }
    `,
    },
    {
      headers: {
        "x-token": token,
      },
    }
  );

module.exports = { getAccount, getAccounts };
