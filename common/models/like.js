'use strict';

module.exports = function(Like) {
  Like.observe('before save', (ctx, next) => {
    ctx.instance.funnyId = ctx.options.accessToken.userId;
    next();
  });
};
