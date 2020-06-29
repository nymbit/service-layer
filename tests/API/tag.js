const axios = require("axios");

const API_URL = "http://localhost:8000/graphql";

const getTags = async (token) =>
  axios.post(
    API_URL,
    {
      query: `
    query {
        tags {
            name
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

const getTag = async (variables, token) =>
  axios.post(
    API_URL,
    {
      query: `
      query ($id: ID!) {
        tag(id: $id) {
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

const createTag = async (variables, token) =>
  axios.post(
    API_URL,
    {
      query: `
        mutation ($paymentMethodId: Int!, $name: String!) {
            createTag(paymentMethodId: $paymentMethodId, name: $name){
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

const updateTag = async (variables, token) =>
  axios.post(
    API_URL,
    {
      query: `
        mutation ($id: ID!, $blocked: Boolean) {
            updateTag(id: $id, blocked: $blocked){
                blocked
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

const deleteTag = async (variables, token) =>
  axios.post(
    API_URL,
    {
      query: `
        mutation ($id: ID!) {
          deleteTag(id: $id)
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

module.exports = { getTags, getTag, createTag, updateTag, deleteTag };
