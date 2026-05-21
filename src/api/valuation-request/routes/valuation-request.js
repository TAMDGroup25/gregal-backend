'use strict';

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::valuation-request.valuation-request', {
  config: {
    create: {
      auth: false,
    },
  },
});
