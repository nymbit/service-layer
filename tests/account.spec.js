/* eslint-disable no-undef */
const { expect } = require("chai");
const { getAccount, getAccounts } = require("./API/account");
const { signIn } = require("./API/user");
require("./user.spec");

describe("accounts", () => {
  before(() => {
    return new Promise(async (resolve) => {
      try {
        const result = await signIn({
          email: "matt@test.com",
          password: "matthew",
        });
        console.log(`SIGN IN OUTPUT: ${result}`)
        this.token = result;
        resolve();
      } catch (error) {
        console.log(`AN ERROR OCCURRED: ${error}`);
        resolve();
      }
    });
  });
  describe("account(id: ID!): Account", () => {
    it("returns an account", async () => {
      const expectedResult = {
        data: {
          account: {
            user: {
              email: "matt@test.com",
            },
          },
        },
      };
      const result = await getAccount({ id: "1" }, this.token);
      expect(result.data).to.eql(expectedResult);
    });

    it("returns error when not the owner of the account", async () => {
      const {
        data: { errors },
      } = await getAccount({ id: "42" }, this.token);
      expect(errors[0].message).to.eql("Not the owner of this account.");
    });
  });
  describe("accounts: [Account]", () => {
    it("returns error when reading all accounts without ADMIN role", async () => {
      const {
        data: {
          data: {
            signIn: { token },
          },
        },
      } = await signIn({
        email: "joe@test.com",
        password: "joebrown",
      });
      const {
        data: { errors },
      } = await getAccounts(token);
      expect(errors[0].message).to.eql(
        "Restricted to users with ADMIN rights."
      );
    });
    it("returns a list of accounts", async () => {
      const expectedResult = {
        data: {
          accounts: [
            {
              user: {
                email: "matt@test.com",
              },
            },
            {
              user: {
                email: "joe@test.com",
              },
            },
          ],
        },
      };
      const result = await getAccounts(this.token);
      expect(result.data).to.eql(expectedResult);
    });
  });
});
