'use strict';

const app = require('../../server/server');

module.exports = function(Uploadimage) {
  Uploadimage.afterRemote('upload', (ctx, res, next) => {
    const {Images} = app.models;

    Images.create({
      url: `${res.result.secure_url.split('/upload/')[0]}/upload/q_10/${res.result.secure_url.split('/upload/')[1]}`,
      userId: ctx.req.accessToken.userId,
    }, (err, r) => {
      return;
    });

    return next();
  });
};
