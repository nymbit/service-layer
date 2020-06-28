require("dotenv/config");
const express = require("express");
const http = require("http");
const DataLoader = require("dataloader");
const { ApolloServer } = require("apollo-server-express");
const schema = require("./graphql/schema");
const resolvers = require("./graphql/resolvers");
const { models, sequelize } = require("./models");
const loaders = require("./graphql/loaders");
const auth = require("./utils/authentication");

const app = express();

const server = new ApolloServer({
  introspection: true,
  playground: true,
  typeDefs: schema,
  resolvers,
  formatError: (error) => {
    const message = error.message
      .replace("SequelizeValidationError: ", "")
      .replace("Validation error: ", "");
    return {
      ...error,
      message,
    };
  },
  context: async ({ req, connection }) => {
    // this function is hit everytime a request is made to the server
    let all_loaders = {
      user: new DataLoader((keys) => loaders.batchUsers(keys, models)),
      account: new DataLoader((keys) => loaders.batchAccounts(keys, models)),
    };

    if (connection) {
      return {
        models,
        loaders: all_loaders,
      };
    }

    if (req) {
      return {
        models,
        currentUser: await auth.getCurrentUser(req),
        loaders: all_loaders,
      };
    }
  },
});

server.applyMiddleware({ app, path: "/graphql" });

const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

const isTest = !!process.env.TEST_DATABASE || true;

const port = process.env.PORT || 8000; //heroku environment variable (merged on deploy)

sequelize.sync({ force: isTest }).then(async () => {
  if (isTest) {
    seedDatabase();
  }

  httpServer.listen({ port }, () => {
    console.log(
      `Apollo Server on http://localhost:${isTest ? "5432" : "8000"}/graphql`
    );
  });
});

const seedDatabase = async () => {
  let user = await models.User.create({
    username: "matthew",
    email: "matt@test.com",
    password: "matthew",
    firstName: "matthew",
    lastName: "troost",
    cellNumber: "27832902933",
    birthDate: "1996-06-17",
  });

  await models.UserRole.create({
    role: "ADMIN",
    userId: user.id,
  });

  await models.Account.create({
    userId: user.id,
  });
};
