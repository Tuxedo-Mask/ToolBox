const config = require('../config');
const dbManager = require('../dbManager')(config.dbCredentials.connection);

module.exports = async () => {
  await dbManager.knex().raw(`CREATE DATABASE IF NOT EXISTS ${config.dbCredentials.database};`);
  const hasUsers = await dbManager.knex().schema.withSchema(config.dbCredentials.database).hasTable('users');
  if (!hasUsers) {
    await dbManager.knex().schema.withSchema(config.dbCredentials.database)
        .createTable('users', (table) => {
          table.increments();
          table.string('name');
          table.string('lastname');
        });
  }
  const storageRoom = await dbManager.knex().schema.withSchema(config.dbCredentials.database).hasTable('storageRoom');
  if (!storageRoom) {
    await dbManager.knex().schema.withSchema(config.dbCredentials.database)
        .createTable('storageRoom', (table) => {
          table.increments();
          table.string('name');
          table.string('address');
          table.string('description');
        });
  }
  const storage = await dbManager.knex().schema.withSchema(config.dbCredentials.database).hasTable('storage');
  if (!storage) {
    await dbManager.knex().schema.withSchema(config.dbCredentials.database)
        .createTable('storage', (table) => {
          table.increments();
          table.string('name');
          table.integer('typeId');
          table.integer('categoryId');
        });
  }
};
