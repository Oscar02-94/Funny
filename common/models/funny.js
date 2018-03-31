'use strict';

const app = require('../../server/server');

module.exports = function(Funny) {
  Funny.register = (email, password, password2, name, phone, next) => {
    const { ImageProfile } = app.models;

    Funny.findOne({
     where: { email }
    }).then(user => {
      if (user) return next({statusCode: 404, message: "El usuario ya existe"});

      if (password === password2) {
        Funny.create({
          email,
          password,
          name,
          number: phone,
        }).then(async res => {
          await ImageProfile.create({
            url: 'https://source.unsplash.com/random/300x300',
            date: Date(),
            funnyId: res.id,
          })
          .then(r => {
            return next(null, {
              message: res,
            });
          })
          .catch(err => {
            return next(err);
          });

        })
        .catch(err => {
          return next(err);
        });
      } else {
        return next({
          statusCode: 403,
          message: 'Las contraseñas no coinciden',
        });
      }
    })
    .catch(err => {
      return next(err);
    });
  };
};
