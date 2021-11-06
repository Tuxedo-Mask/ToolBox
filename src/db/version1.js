'use strict';

const config = require('../config');
const dbManager = require('../dbManager')(config.dbCredentials.connection);

module.exports = async () => {
  await dbManager.knex().raw(`CREATE DATABASE IF NOT EXISTS ${config.dbCredentials.database};`);
  const hasUsers = await dbManager.knex().schema.withSchema(config.dbCredentials.database).hasTable('users');
  if (!hasUsers) {
    await dbManager.knex().schema.withSchema(config.dbCredentials.database)
        .createTable('users', (table) => {
          table.increments();
          table.string('name').notNullable();
          table.string('lastname').notNullable();
        });
  }
  const storageRoom = await dbManager.knex().schema.withSchema(config.dbCredentials.database).hasTable('storageRoom');
  if (!storageRoom) {
    await dbManager.knex().schema.withSchema(config.dbCredentials.database)
        .createTable('storageRoom', (table) => {
          table.increments();
          table.integer('ownerId', 10).unsigned();
          table.string('name').notNullable();
          table.string('address').notNullable();
          table.string('description').nullable();
          table.string('imagePath').nullable();
          table.unique(['name', 'address']);
          table.foreign('ownerId')
              .references('id')
              .inTable('users')
              .onDelete('CASCADE')
              .onUpdate('CASCADE');
        });
  }
  const storage = await dbManager.knex().schema.withSchema(config.dbCredentials.database).hasTable('storage');
  if (!storage) {
    await dbManager.knex().schema.withSchema(config.dbCredentials.database)
        .createTable('storage', (table) => {
          table.increments();
          table.string('name').notNullable();
          table.integer('storageRoomId', 10).unsigned();
          table.integer('typeId').nullable();
          table.integer('categoryId').nullable();
          table.string('imagePath').nullable();
          table.foreign('storageRoomId')
              .references('id')
              .inTable('storageRoom')
              .onDelete('CASCADE')
              .onUpdate('CASCADE');
        });
  }
};
