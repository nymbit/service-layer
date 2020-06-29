/* eslint-disable no-undef */
const { expect } = require("chai");
const {
  createPaymentMethod,
  updatePaymentMethod,
  deletePaymentMethod,
} = require("./API/paymentMethod");
const { signIn } = require("./API/user");

describe("payment methods", () => {
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
  describe("createPaymentMethod(name: String!, token: String!): PaymentMethod!", () => {
    it("creates a payment method", async () => {
      const expectedResult = {
        data: {
          createPaymentMethod: {
            name: "My credit card",
          },
        },
      };
      const result = await createPaymentMethod(
        { name: "My credit card", token: "jhagdfsagsfyas" },
        this.token
      );
      expect(result.data).to.eql(expectedResult);
    });
  });
  describe("updatePaymentMethod(id: ID!, name: String): PaymentMethod!", () => {
    it("return error as payment method does not exist", async () => {
      const expectedResult = {
        data: {
          accounts: [
            {
              user: {
                username: "My updated credit card",
              },
            },
          ],
        },
      };
      const {
        data: { errors },
      } = await updatePaymentMethod(
        {
          id: 42,
          name: "My updated credit card",
        },
        this.token
      );
      expect(errors[0].message).to.eql("Payment method does not exist.");
    });
    it("updates a payment method", async () => {
      const expectedResult = {
        data: {
          updatePaymentMethod: {
            name: "My updated credit card",
          },
        },
      };
      const result = await updatePaymentMethod(
        {
          id: 2,
          name: "My updated credit card",
        },
        this.token
      );
      expect(result.data).to.eql(expectedResult);
    });
  });
});
