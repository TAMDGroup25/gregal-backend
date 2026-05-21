const { randomBytes } = require('crypto');

module.exports = ({ env }) => {
  const appKeys = env.array('APP_KEYS', []);

  if (!appKeys.length) {
    const nodeEnv = env('NODE_ENV', 'development');
    if (nodeEnv === 'production') {
      throw new Error('Missing APP_KEYS environment variable');
    }

    appKeys.push(
      randomBytes(32).toString('base64'),
      randomBytes(32).toString('base64')
    );
  }

  return {
    host: env('HOST', '0.0.0.0'),
    port: env.int('PORT', 1337),
    app: {
      keys: appKeys,
    },
    webhooks: {
      populateRelations: env.bool('WEBHOOKS_POPULATE_RELATIONS', false),
    },
  };
};
