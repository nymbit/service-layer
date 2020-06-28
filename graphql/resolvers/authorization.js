//guarding resolver or resolver middleware

const { ForbiddenError, ValidationError } = require("apollo-server");
const { combineResolvers, skip } = require("graphql-resolvers");

const isAuthenticated = (parent, args, { currentUser }) =>
  currentUser ? skip : new ForbiddenError("Not an authorized user.");

const isAdmin = combineResolvers(
  isAuthenticated,
  (parent, args, { currentUser: { role } }) =>
    role === "ADMIN"
      ? skip
      : new ForbiddenError("Restricted to users with ADMIN rights.")
);

const isAccountOwner = (parent, { accountId }, { currentUser: {id}, models }) => {
  const account = models.Account.findOne({ where: { userId: id } });
  return accountId === account.id
    ? skip
    : new ForbiddenError("Not the owner of this account.");
};

const isPaymentMethodOwner = (parent, { id }, { currentUser, models }) => {
  const paymentMethod = models.PaymentMethod.findByPk(id, { include: Account });

  if(!paymentMethod) return new ValidationError("Payment method does not exist.");

  return paymentMethod.account.userId === currentUser.id
    ? skip
    : new ForbiddenError("Not the owner of this payment method.");
};

module.exports = { isAuthenticated, isAdmin, isAccountOwner, isPaymentMethodOwner };
