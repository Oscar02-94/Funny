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
  mongo: {
    name: 'mongo',
    connector: 'mongodb',
    url: `mongodb://${process.env.userDB}:${process.env.passwordDB}@funny-shard-00-00-4beoo.mongodb.net:27017,funny-shard-00-01-4beoo.mongodb.net:27017,funny-shard-00-02-4beoo.mongodb.net:27017/test?ssl=true&replicaSet=funny-shard-0&authSource=admin`,
  },
};
