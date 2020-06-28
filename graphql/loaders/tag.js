async function batchTags(keys, models) {
  const tags = await models.Tag.findAll({
    where: {
      id: keys,
    },
  });
  return keys.map(
    (key) =>
      tags.find((tag) => tag.id === key) || new Error(`No result for ${key}`)
  );
}

module.exports = batchTags;
