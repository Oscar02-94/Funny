'use strict';

const app = require('../../server/server');

module.exports = function(Publication) {
  Publication.observe('before save', (ctx, next) => {
    if (ctx.isNewInstance !== undefined) {
      ctx.instance.funnyId = ctx.options.accessToken.userId;
    }

    return next();
  });

  Publication.beforeRemote('edit', (ctx, instance, next) => {
    Publication.findById(ctx.args.publicationId)
      .then(result => {
        if (result.funnyId.toString() == ctx.req.accessToken.userId) {
          return next();
        }

        return next({
          statusCode: 403,
          message: 'Esta publicacion no te pertenece',
        });
      })
      .catch(err => {
        return next(err);
      });
  });

  Publication.edit = (publicationId, data, next) => {
    Publication.updateAll({id: publicationId}, data)
      .then(result => {
        return next(null, result);
      })
      .catch(err => {
        return next(err);
      });
  };
};
