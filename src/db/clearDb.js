'use strict';

const constants = require('../constants');

if (!process.env.NODE_ENV || process.env.NODE_ENV === constants.environments.dev) {
  // eslint-disable-next-line global-require
  require('dotenv').config('ToolBox');
}
const config = require('../config');

const dbManager = require('../dbManager')(config.dbCredentials.connection);
try {
  (async () => {
    await dbManager.knex().raw(`DROP DATABASE IF EXISTS ${config.dbCredentials.database};`);
    await dbManager.knex().destroy();
  })();
} catch (err) {
  console.log('Exception occurred during migrations, err: ', err);
  dbManager.knex().destroy();
}
