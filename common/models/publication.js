'use strict';

const app = require('../../server/server');

module.exports = function(Publication) {
  Publication.observe('before save', (ctx, next) => {
    ctx.instance.funnyId = ctx.options.accessToken.userId;

    return next();
  });
};
