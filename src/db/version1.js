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

module.exports = async () => {
  await dbManager.knex().raw(`CREATE DATABASE IF NOT EXISTS ${process.env.dbName};`);
  const hasUsers = await dbManager.knex().schema.withSchema(process.env.dbName).hasTable('users');
  if (!hasUsers) {
    await dbManager.knex().schema.withSchema(process.env.dbName)
      .createTable('users', (table) => {
        table.increments();
        table.string('name');
        table.string('lastname');
      });
  }
  const storageRoom = await dbManager.knex().schema.withSchema(process.env.dbName).hasTable('storageRoom');
  if (!storageRoom) {
    await dbManager.knex().schema.withSchema(process.env.dbName)
      .createTable('storageRoom', (table) => {
        table.increments();
        table.string('name');
        table.string('address');
        table.string('description');
      });
  }
  const storage = await dbManager.knex().schema.withSchema(process.env.dbName).hasTable('storage');
  if (!storage) {
    await dbManager.knex().schema.withSchema(process.env.dbName)
      .createTable('storage', (table) => {
        table.increments();
        table.string('name');
        table.integer('typeId');
        table.integer('categoryId');
      });
  }
};
