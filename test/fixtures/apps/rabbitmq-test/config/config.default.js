'use strict';

exports.keys = '123456';

exports.rabbitmq = 'use strict';

/**
 * egg-rabbitmq default config
 * @member Config#rabbitmq
 * @property {String} SOME_KEY - some description
 */
exports.rabbitmq = {

  /* ----------------------------------default config for simple use rabbitMQ----------------------------------- */
  default: {
    // url: 'amqp://guest:guest@localhost:5672',
  },
  // Message queue instance name
  queueName: 'egg-rabbitmq-test',
  app: true,
  agent: true,

  /* ----------------------------------Basic usage for RabbitMQ in Egg Plugin----------------------------------- */

  // only client rabbitmq config
  client: {
    rabbitmq: {
      protocol: 'amqp',
      hostname: 'localhost',
      port: 5672,
      username: 'guest',
      password: 'guest',
      locale: 'en_US',
      frameMax: 0,
      heartbeat: 0,
      vhost: '/',
    },
    // other plugin config for more safe to the client if you have
    // socketOptions: {
    //   cert: certificateAsBuffer, // client cert
    //   key: privateKeyAsBuffer, // client key
    //   passphrase: 'MySecretPassword', // passphrase for key
    //   ca: [caCertAsBuffer], // array of trusted CA certs
    // },

  },

  /* ------------------------More advanced usage for RabbitMQ in Egg Plugin---------------------------------------- */

  // more client rabbitmq config
  // clients: {
  //   client1: {
  //     // url: 'http://',
  //     rabbitmq: {
  //       protocol: 'amqp',
  //       hostname: 'localhost',
  //       port: 5672,
  //       username: 'guest',
  //       password: 'guest',
  //       locale: 'en_US',
  //       frameMax: 0,
  //       heartbeat: 0,
  //       vhost: '/',
  //     },
  // other plugin config for more safe to the client if you have
  //   socketParams: {
  //     cert: certificateAsBuffer, // client cert
  //     key: privateKeyAsBuffer, // client key
  //     passphrase: 'MySecretPassword', // passphrase for key
  //     ca: [ caCertAsBuffer ], // array of trusted CA certs
  //   },

  // },
  // client2: {
  //   rabbitmq: {
  //     protocol: 'amqp',
  //     hostname: 'localhost',
  //     port: 5672,
  //     username: 'guest',
  //     password: 'guest',
  //     locale: 'en_US',
  //     frameMax: 0,
  //     heartbeat: 0,
  //     vhost: '/',
  //   },
  // other plugin config for more safe to the client if you have
  // socketParams: {
  //   cert: certificateAsBuffer, // client cert
  //   key: privateKeyAsBuffer, // client key
  //   passphrase: 'MySecretPassword', // passphrase for key
  //   ca: [ caCertAsBuffer ], // array of trusted CA certs
  // },
  // },
  // .... can add more client config for multi client data sources
  // },
};
