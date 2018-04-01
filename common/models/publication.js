'use strict';

const app = require('../../server/server');

module.exports = function(Publication) {
  Publication.publish = (
    name,
    userId,
    information,
    category,
    img,
    next
  ) => {
    const {Images} = app.models;
    console.log(img, '---')
    Publication.create({
      name,
      funnyId: userId,
      information,
      category,
    }).then(result => {
      img.map(async i => {
        await Images.updateAll({url: i.secure_url}, {publicationId: result.id});
      });
      return next(null, result);
    })
    .catch(err => {
      return next(err);
    });
  };

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
