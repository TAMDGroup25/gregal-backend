'use strict';

/**
 * property controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

const requiredPopulate = {
  tourCoverImage: true,
  virtualTourFolder: {
    populate: {
      files: true,
    },
  },
};

const mergePopulate = (populate) => {
  if (!populate) {
    return { ...requiredPopulate };
  }

  if (populate === '*' || populate === true) {
    return populate;
  }

  if (typeof populate !== 'object' || Array.isArray(populate)) {
    return populate;
  }

  return {
    ...requiredPopulate,
    ...populate,
    virtualTourFolder:
      populate.virtualTourFolder && typeof populate.virtualTourFolder === 'object'
        ? {
            ...requiredPopulate.virtualTourFolder,
            ...populate.virtualTourFolder,
            populate:
              populate.virtualTourFolder.populate &&
              typeof populate.virtualTourFolder.populate === 'object'
                ? {
                    ...requiredPopulate.virtualTourFolder.populate,
                    ...populate.virtualTourFolder.populate,
                  }
                : requiredPopulate.virtualTourFolder.populate,
          }
        : requiredPopulate.virtualTourFolder,
  };
};

module.exports = createCoreController('api::property.property', () => ({
  async find(ctx) {
    ctx.query = {
      ...ctx.query,
      populate: mergePopulate(ctx.query?.populate),
    };

    return await super.find(ctx);
  },

  async findOne(ctx) {
    ctx.query = {
      ...ctx.query,
      populate: mergePopulate(ctx.query?.populate),
    };

    return await super.findOne(ctx);
  },
}));
