const jwt = require("jsonwebtoken");
const { AuthenticationError } = require("apollo-server-express");

async function getCurrentUser(request) {
  const token = request.headers["x-token"];
  if (!token) return;
  try {
    return await jwt.verify(token, process.env.SECRET); //TODO: add to heroku config vars
  } catch (e) {
    //commented this out as it would throw an error for unauth queries if token had expired
    throw new AuthenticationError("Invalid token.");
  }
}

async function createToken(user, expiresIn) {
  const { id, email, username, role } = user;
  return await jwt.sign({ id, email, username, role }, process.env.SECRET, {
    expiresIn,
  });
}

module.exports = { getCurrentUser, createToken };
