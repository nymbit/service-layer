const batchUsers = require('./user');
const batchAccounts = require('./account');
const batchPaymentMethods = require('./paymentMethod');
const batchUserAttachments = require('./userAttachment');
const batchUserRoles = require('./userRole');
const batchTags = require('./tag');

module.exports = { batchUsers, batchAccounts, batchPaymentMethods, batchUserAttachments, batchUserRoles, batchTags };
