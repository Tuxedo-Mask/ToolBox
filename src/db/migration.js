'use strict';

const constants = require('../constants');

if (!process.env.NODE_ENV || process.env.NODE_ENV === constants.environments.dev) {
  // eslint-disable-next-line global-require
  require('dotenv').config('ToolBox');
}
const config = require('../config');

const dbManager = require('../dbManager')(config.dbCredentials.connection);
const version1 = require('./version1');

try {
  (async () => {
    await version1();
    await dbManager.knex().destroy();
  })();
} catch (err) {
  console.log('Exception occurred during migrations, err: ', err);
  dbManager.knex().destroy();
}
