const jwt = require("jsonwebtoken");

async function getCurrentUser(request) {
  const token = request.headers["x-token"];
  if (token) {
    try {
      return await jwt.verify(token, process.env.SECRET);
    } catch (e) {
      //commented this out as it would throw an error for unauth queries if token had expired
      //throw new AuthenticationError("Your session expired. Sign in again.");
    }
  }
}

module.exports = { getCurrentUser };
