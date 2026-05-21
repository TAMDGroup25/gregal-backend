const { createHmac, randomBytes } = require("crypto");

module.exports = ({ env }) => {
  const nodeEnv = env("NODE_ENV", "development");
  const rawAppKeys = env("APP_KEYS");

  const parseAppKeys = (raw) => {
    if (!raw) return [];
    if (Array.isArray(raw)) return raw;

    if (typeof raw === "string") {
      const trimmed = raw.trim();
      if (!trimmed) return [];

      if (trimmed.startsWith("[")) {
        try {
          const parsed = JSON.parse(trimmed);
          if (Array.isArray(parsed)) return parsed.map((v) => String(v));
        } catch {
          return trimmed.split(",").map((v) => v.trim());
        }
      }

      return trimmed.split(",").map((v) => v.trim());
    }

    return [];
  };

  const appKeys = parseAppKeys(rawAppKeys).filter(Boolean);

  if (!appKeys.length) {
    if (nodeEnv === "production") {
      throw new Error(
        "Missing APP_KEYS environment variable (expected at least 2 comma-separated values)",
      );
    }

    appKeys.push(
      randomBytes(32).toString("base64"),
      randomBytes(32).toString("base64"),
    );
  }

  if (appKeys.length === 1) {
    const seed = appKeys[0];
    appKeys[0] = createHmac("sha256", seed)
      .update("strapi-app-key-1")
      .digest("base64");
    appKeys.push(
      createHmac("sha256", seed).update("strapi-app-key-2").digest("base64"),
    );
  } else if (appKeys.length < 2) {
    while (appKeys.length < 2) {
      appKeys.push(randomBytes(32).toString("base64"));
    }
  }

  return {
    host: env("HOST", "0.0.0.0"),
    port: env.int("PORT", 1337),
    app: {
      keys: appKeys,
    },
    webhooks: {
      populateRelations: env.bool("WEBHOOKS_POPULATE_RELATIONS", false),
    },
  };
};
