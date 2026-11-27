'use strict';

const { foundation: nemkitFoundation } = require('nemkit');

const { LIMIT_PERIOD } = nemkitFoundation.constants;

/** Catálogo de planes de Nemkit Restaurant. */
const PLANS = Object.freeze({
  free: Object.freeze({
    code: 'free',
    name: 'Gratuito',
    price: 0,
    currency: 'COP',
    limits: Object.freeze({
      employees: Object.freeze({ max: 30, period: LIMIT_PERIOD.TOTAL }),
      products: Object.freeze({ max: 300, period: LIMIT_PERIOD.TOTAL }),
      contacts: Object.freeze({ max: 1000, period: LIMIT_PERIOD.TOTAL }),
    }),
    caps: Object.freeze({}),
  }),
});

module.exports = { PLANS };
