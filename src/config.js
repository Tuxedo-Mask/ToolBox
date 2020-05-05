'use strict';
const _ = require('lodash');
// TODO investigate 'envalid' module
const {
  NODE_ENV,
  PORT,
  LOG_LEVEL
} = process.env;

module.exports = {
  nodeEnv: NODE_ENV,
  logLevel: LOG_LEVEL,
  port: !_.isUndefined(PORT) ? +(PORT) : null
};
