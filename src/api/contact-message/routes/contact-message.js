'use strict';

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::contact-message.contact-message', {
  config: {
    create: {
      auth: false,
    },
  },
});
