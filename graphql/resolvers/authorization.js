//guarding resolver or resolver middleware

const { ForbiddenError } = require('apollo-server');
const { combineResolvers, skip } = require('graphql-resolvers');

const isAuthenticated = (parent, args, { currentUser }) =>
currentUser ? skip : new ForbiddenError('Not authenticated as user.');

const isAdmin = combineResolvers(
    isAuthenticated,
    (parent, args, { currentUser: { role } }) =>
        role === 'ADMIN'
            ? skip
            : new ForbiddenError('Not authorized as admin.'),
);

const isMessageOwner = async (
    parent,
    { id },
    { models, currentUser },
) => {
    const message = await models.Message.findByPk(id, { raw: true });
    if (message.userId !== currentUser.id) {
        throw new ForbiddenError('Not authenticated as owner.');
    }
    return skip;
};

module.exports = { isAuthenticated, isMessageOwner, isAdmin }