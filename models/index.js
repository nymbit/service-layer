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
  UserRole: sequelize.import("./userRole"),
  UserAttachment: sequelize.import("./userAttachment"),
  Account: sequelize.import("./account"),
  Tag: sequelize.import("./tag"),
  PaymentMethod: sequelize.import("./paymentMethod")
};

Object.keys(models).forEach((key) => {
  if ("associate" in models[key]) {
    models[key].associate(models);
  }
});

const umzug = new Umzug({
  migrations: {
    path: "./models/migrations",
    params: [sequelize.getQueryInterface()],
  },
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
