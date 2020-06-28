/* eslint-disable no-undef */
const { expect } = require("chai");
const { signIn, deleteUser, getUser, signUp } = require("./API/user");

describe("users", () => {
  describe("signUp(username: String!, password: String! ...): Token", () => {
    it("returns a token after successfully creating user", async () => {
      const result = await signUp({
        username: "joe",
        password: "joebrown",
        email: "joe@test.com",
        firstName: "joe",
        lastName: "brown",
        cellNumber: "27823469544",
        birthDate: "1995-02-04",
      });
      expect(result.data)
        .to.haveOwnProperty("data")
        .to.haveOwnProperty("signUp")
        .to.haveOwnProperty("token")
        .to.be.a("string");
    });
  });

  describe("user(id: String!): User", () => {
    it("returns a user when user can be found", async () => {
      const expectedResult = {
        data: {
          user: {
            id: "1",
            username: "matthew",
            email: "matt@test.com",
          },
        },
      };
      const result = await getUser({ id: "1" });
      expect(result.data).to.eql(expectedResult);
    });

    it("returns null when user cannot be found", async () => {
      const expectedResult = {
        data: {
          user: null,
        },
      };
      const result = await getUser({ id: "42" });
      expect(result.data).to.eql(expectedResult);
    });
  });

  describe("deleteUser(id: String!): Boolean!", () => {
    it("returns an error because only admins can delete a user", async () => {
      const {
        data: {
          data: {
            signIn: { token },
          },
        },
      } = await signIn({
        login: "joe",
        password: "joebrown",
      });
      const {
        data: { errors },
      } = await deleteUser({ id: "1" }, token);
      expect(errors[0].message).to.eql("Restricted to users with ADMIN rights.");
    });
  });
});
