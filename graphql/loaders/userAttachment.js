async function batchUserAttachments(keys, models) {
  const userAttachments = await models.UserAttachment.findAll({
    where: {
      id: keys,
    },
  });
  return keys.map(
    (key) =>
      userAttachments.find((userAttachment) => userAttachment.id === key) ||
      new Error(`No result for ${key}`)
  );
}

module.exports = batchUserAttachments;
