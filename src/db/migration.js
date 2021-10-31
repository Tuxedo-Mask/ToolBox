const constants = require('../constants');
if (!process.env.NODE_ENV || process.env.NODE_ENV === constants.environments.dev) {
  // eslint-disable-next-line global-require
  require('dotenv').config('ToolBox');
}

connection = {
  // HH::TODO move env related staff to config
  host: process.env.dbHost,
  user: process.env.dbUser,
  password: process.env.dbPassword,
  port: parseInt(process.env.dbPort),
};

const dbManager = require('../dbManager')(connection);
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