"use strict";
const Sequelize = require("sequelize");
const Umzug = require("umzug");

let sequelize;
if (process.env.DATABASE_URL) {
  //heroku environment variable (merged at deployment)
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: "postgres",
  });
} else {
  sequelize = new Sequelize(
    process.env.TEST_DATABASE || process.env.DATABASE,
    process.env.DATABASE_USER,
    process.env.DATABASE_PASSWORD,
    {
      dialect: "postgres",
    }
  );
}

const models = {
  User: sequelize.import("./user"),
  PricePoint: sequelize.import("./pricepoint"),
  Event: sequelize.import("./event"),
  State: sequelize.import("./state"),
  Profile: sequelize.import("./profile"),
  Entry: sequelize.import("./entry"),
  Exit: sequelize.import("./exit"),
};

Object.keys(models).forEach((key) => {
  if ("associate" in models[key]) {
    models[key].associate(models);
  }
});

const umzug = new Umzug({
  migrations: {
    path: "./migrations",
    params: [sequelize.getQueryInterface()],
  },
  // indicates that the migration data should be store in the database
  // itself through sequelize. The default configuration creates a table
  // named `SequelizeMeta`.
  storage: "sequelize",
  storageOptions: {
    sequelize: sequelize,
  },
});

(async () => {
  // Checks migrations and run them if they are not already applied. To keep
  // track of the executed migrations, a table (and sequelize model) called SequelizeMeta
  // will be automatically created (if it doesn't exist already) and parsed.
  await umzug.up();
})();

module.exports = { sequelize, models };
