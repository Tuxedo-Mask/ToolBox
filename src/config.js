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
} = process.env;

module.exports = {
  nodeEnv: NODE_ENV,
  logLevel: LOG_LEVEL,
  port: !_.isUndefined(PORT) ? +(PORT) : null,
  dbCredentials: {
    host: dbHost,
    user: dbUser,
    password: dbPassword,
    database: dbName,
    // port: MYSQL_PORT = 3306;
    // xProtocolPort: X_PROTOCOL_PORT = 33060,
    // sslCert: db_instance_server_ca_cert
    // port: !_.isUndefined(DATABASE_PORT) ? parseInt(DATABASE_PORT) : null
  },
};
