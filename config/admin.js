const { randomBytes } = require('crypto');

module.exports = ({ env }) => {
  const nodeEnv = env('NODE_ENV', 'development');

  const getSecret = (name, bytes = 32) => {
    const value = env(name);
    if (value) return value;
    if (nodeEnv === 'production') {
      throw new Error(`Missing ${name} environment variable`);
    }
    return randomBytes(bytes).toString('base64');
  };

  return {
    auth: {
      secret: getSecret('ADMIN_JWT_SECRET', 32),
    },
    apiToken: {
      salt: getSecret('API_TOKEN_SALT', 16),
    },
    transfer: {
      token: {
        salt: getSecret('TRANSFER_TOKEN_SALT', 16),
      },
    },
    flags: {
      nps: env.bool('FLAG_NPS', true),
      promoteEE: env.bool('FLAG_PROMOTE_EE', true),
    },
  };
};
