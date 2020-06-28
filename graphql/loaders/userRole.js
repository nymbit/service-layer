async function batchUserRoles(keys, models) {
  const userRoles = await models.UserRole.findAll({
    where: {
      id: keys,
    },
  });
  return keys.map(
    (key) =>
      userRoles.find((userRole) => userRole.id === key) ||
      new Error(`No result for ${key}`)
  );
}

module.exports = batchUserRoles;
