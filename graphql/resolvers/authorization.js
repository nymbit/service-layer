//guarding resolver or resolver middleware

const { ForbiddenError, ValidationError } = require("apollo-server");
const { combineResolvers, skip } = require("graphql-resolvers");

const isAuthenticated = (parent, args, { currentUser }) =>
  currentUser ? skip : new ForbiddenError("Not an authorized user.");

const isAdmin = combineResolvers(
  isAuthenticated,
  (parent, args, { currentUser: { roles } }) => {
    return roles.includes("ADMIN")
      ? skip
      : new ForbiddenError("Restricted to users with ADMIN rights.");
  }
);

const isAccountOwner = async (parent, { id }, { currentUser, models }) => {
  const account = await models.Account.findOne({
    where: { userId: currentUser.id },
  });

  return id == account.id
    ? skip
    : new ForbiddenError("Not the owner of this account.");
};

const isPaymentMethodOwner = async (
  parent,
  { id, paymentMethodId },
  { currentUser, models }
) => {
  const paymentMethod = await models.PaymentMethod.findByPk(id || paymentMethodId, {
    include: models.Account,
  });

  if (!paymentMethod)
    return new ValidationError("Payment method does not exist.");

  return paymentMethod.account.userId == currentUser.id
    ? skip
    : new ForbiddenError("Not the owner of this payment method.");
};

const isTagOwner = async (parent, { id }, { currentUser, models }) => {
  const tag = await models.Tag.findByPk(id, { include: models.Account });

  if (!tag) return new ValidationError("Tag does not exist.");

  return tag.account.userId == currentUser.id
    ? skip
    : new ForbiddenError("Not the owner of this tag.");
};

module.exports = {
  isAuthenticated,
  isAdmin,
  isAccountOwner,
  isPaymentMethodOwner,
  isTagOwner,
};
