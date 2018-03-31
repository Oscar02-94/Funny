'use strict';

module.exports = function(Comment) {
  Comment.observe('before save', (ctx, next) => {
    ctx.instance.funnyId = ctx.options.accessToken.userId;
    return next();
  });
};
