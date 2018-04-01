'use strict';

module.exports = {
  cloudinary: {
    name: 'cloudinary',
    connector: '@kolach/loopback-component-cloudinary',
    config: {
      'cloud_name': process.env.name,
      'api_key': process.env.key,
      'api_secret': process.env.secret,
    },
    debug: true,
  },
};
