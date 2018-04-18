'use strict';

module.exports = function(Imageprofile) {
  Imageprofile.updateImage = (imageId, url, next) => {
    Imageprofile.updateAll({id: imageId}, {url: url})
      .then(res => {
        return next(null, res);
      })
      .catch(err => {
        return next(err);
      });
  };
};
