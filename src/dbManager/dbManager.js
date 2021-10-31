'use strict';

const knex = require('knex');
const _ = require('lodash');

/** Class providing ability to connect to db via knex */
class DbManager {
  /**
   * @function constructor
   * @description construct DbManager object
   * @param {Object} connetcion : connection details
   */
  constructor(connection = null) {
    if (_.isNil(connection)) {
      connection = {
        // HH::TODO move env related staff to config
        host: process.env.dbHost,
        user: process.env.dbUser,
        password: process.env.dbPassword,
        database: process.env.dbName,
        port: parseInt(process.env.db_port) | 3306,
      };
    }
    connection.timezone = 'UTC';
    connection.typeCast = function castField(field, useDefaultTypeCasting) {
      if (field.type === 'BIT' && field.length === 1) {
        const bytes = field.buffer();
        return bytes ? bytes[0] === 1 : null;
      }
      return useDefaultTypeCasting();
    },
    this._knex = knex({
      client: 'mysql',
      connection: connection,
      pool: {
        min: process.env.db_min_pool_size ? parseInt(process.env.db_min_pool_size) : 0,
        max: process.env.db_max_pool_size ? parseInt(process.env.db_max_pool_size) : 10,
      },
    });
  }
  /**
   * @function knex
   * @description get knex object
   * @return {Object} knex object
   */
  knex() {
    return this._knex;
  }
}

/** Class to ensure that CloudSQL instance is the same for whole microservice */
class Singleton {
  /**
   * @function constructor
   * @description construct Singleton object
   */
  constructor(connection = null) {
    if (!Singleton.instance) {
      Singleton.instance = new DbManager(connection);
    }
  }

  /**
   * @function getInstance
   * @description get dbManager instance
   * @return {DbManager}
   */
  getInstance() {
    return Singleton.instance;
  }
}

module.exports = (connection = null) => {
  return new Singleton(connection).getInstance();
};
