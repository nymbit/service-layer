async function batchPaymentMethods(keys, models) {
    const paymentMethods = await models.PaymentMethod.findAll({
      where: {
        id: keys,
      },
    });
    return keys.map((key) => paymentMethods.find((paymentMethod) => paymentMethod.id === key) || new Error(`No result for ${key}`));
  }
  
  module.exports = batchPaymentMethods;