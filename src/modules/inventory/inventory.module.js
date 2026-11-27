'use strict';

const { deliveriesService } = require('./deliveries/deliveries.service');
const { salesService } = require('./sales/sales.service');
const { kitchenService } = require('./kitchen/kitchen.service');
const { loyaltyService } = require('./statistics/loyalty/loyalty.service');

deliveriesService.setSalesOperations({
  voidSale: (...args) => salesService.voidSale(...args),
  setOrderStatusFromDelivery: (...args) => kitchenService.setOrderStatusFromDelivery(...args),
});

salesService.setStatisticsOperations({
  recordCustomerPurchase: (...args) => loyaltyService.recordCustomerPurchase(...args),
  reverseCustomerPurchase: (...args) => loyaltyService.reverseCustomerPurchase(...args),
});

module.exports = { deliveriesService, salesService };
