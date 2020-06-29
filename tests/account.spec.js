/* eslint-disable no-undef */
const { expect } = require("chai");
const { getAccount, getAccounts } = require("./API/account");
const { signIn } = require("./API/user");

describe("accounts", () => {
  before(() => {
    return new Promise(async (resolve) => {
      const {
        data: {
          data: {
            signIn: { token },
          },
        },
      } = await signIn({
        login: "matthew",
        password: "matthew",
      });
      this.token = token;
      resolve();
    });
  });
  describe("account(id: ID!): Account", () => {
    it("returns an account", async () => {
      const expectedResult = {
        data: {
          account: {
            user: {
              username: "matthew",
            },
          },
        },
      };
      const result = await getAccount({ id: "1" }, this.token);
      expect(result.data).to.eql(expectedResult);
    });

    it("returns null when account cannot be found", async () => {
      const {
        data: { errors },
      } = await getAccount({ id: "42" }, this.token);
      expect(errors[0].message).to.eql("Not the owner of this account.");
    });
  });
  describe("accounts: [Account]", () => {
    it("returns error when reading all accounts without ADMIN role", async () => {
      const {
        data: { errors },
      } = await getAccounts(this.token);
      expect(errors[0].message).to.eql("Restricted to users with ADMIN rights.");
    });
    it("returns a list of accounts with one item", async () => {
      const expectedResult = {
        data: {
          accounts: [
            {
              user: {
                username: "matthew",
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
