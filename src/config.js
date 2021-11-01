'use strict';

const _ = require('lodash');
// VZ::TODO investigate 'envalid' module
const {
  NODE_ENV,
  PORT,
  LOG_LEVEL,
  dbHost,
  dbUser,
  dbPassword,
  dbName,
  dbPort,
  dbMinPoolSize,
  dbMaxPoolSize,
} = process.env;

module.exports = {
  nodeEnv: NODE_ENV,
  logLevel: LOG_LEVEL,
  port: !_.isUndefined(PORT) ? +(PORT) : null,
  dbCredentials: {
    connection: {
      host: dbHost,
      user: dbUser,
      password: dbPassword,
      port: parseInt(dbPort),
    },
    database: dbName,
    minPoolSize: parseInt(dbMinPoolSize),
    maxPoolSize: parseInt(dbMaxPoolSize),
    // port: MYSQL_PORT = 3306;
    // xProtocolPort: X_PROTOCOL_PORT = 33060,
    // sslCert: db_instance_server_ca_cert
  },
};
