'use strict';

module.exports = function(Imageprofile) {
  Imageprofile.updateImage = (imageId, url, next) => {
    Imageprofile.updateAll({id: imageId}, {url: `${url.split('/upload/')[0]}/upload/q_10/${url.split('/upload/')[1]}`})
      .then(res => {
        return next(null, res);
      })
      .catch(err => {
        return next(err);
      });
  };
};
