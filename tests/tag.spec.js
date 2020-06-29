/* eslint-disable no-undef */
const { expect } = require("chai");
const {
  getTags,
  getTag,
  createTag,
  updateTag,
  deleteTag,
} = require("./API/tag");
const { signIn } = require("./API/user");

describe("tags", () => {
  before(() => {
    return new Promise(async (resolve) => {
      const {
        data: {
          data: {
            signIn: { token },
          },
        },
      } = await signIn({
        email: "matt@test.com",
        password: "matthew",
      });
      this.token = token;
      resolve();
    });
  });
  describe("tag(id: ID!): Tag", () => {
    it("returns a tag", async () => {
      const expectedResult = {
        data: {
          tag: {
            name: "Bicycle tag",
          },
        },
      };
      const result = await getTag({ id: "1" }, this.token);
      expect(result.data).to.eql(expectedResult);
    });
  });
  describe("tags: [Tag]", () => {
    it("returns error when reading all tags without ADMIN role", async () => {
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
      } = await getTags(token);
      expect(errors[0].message).to.eql(
        "Restricted to users with ADMIN rights."
      );
    });
    it("returns a list of tags with one item", async () => {
      const expectedResult = {
        data: {
          tags: [
            {
              name: "Bicycle tag",
            },
          ],
        },
      };
      const result = await getTags(this.token);
      expect(result.data).to.eql(expectedResult);
    });
  });
  describe("createTag(paymentMethodId: String! name: String!): Tag!", () => {
    it("error if user creates tag with payment method of another user", async () => {
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
      } = await createTag({ paymentMethodId: 1, name: "Watch tag" }, token);
      expect(errors[0].message).to.eql("Not the owner of this payment method.");
    });
    it("creates a new tag", async () => {
      const expectedResult = {
        data: {
          createTag: {
            name: "Watch tag",
          },
        },
      };
      const result = await createTag(
        { paymentMethodId: 1, name: "Watch tag" },
        this.token
      );
      expect(result.data).to.eql(expectedResult);
    });
  });
  describe("updateTag(id: ID!, paymentMethodId: String name: String ...): Tag!", () => {
    it("error if user updates tag that isn't theirs", async () => {
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
      } = await updateTag(
        {
          id: 2,
          blocked: true,
        },
        token
      );
      expect(errors[0].message).to.eql("Not the owner of this tag.");
    });
    it("updates tag", async () => {
        const expectedResult = {
            data: {
              updateTag: {
                blocked: true,
              },
            },
          };
          const result = await updateTag(
            {
              id: 2,
              blocked: true,
            },
            this.token
          );
          expect(result.data).to.eql(expectedResult);
    });
  });
  describe("deleteTag(id: ID!): Boolean!", () => {
    it("error if user does not own tag", async () => {
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
      } = await deleteTag(
        {
          id: 1
        },
        token
      );
      expect(errors[0].message).to.eql("Not the owner of this tag.");
    });
  });
});
