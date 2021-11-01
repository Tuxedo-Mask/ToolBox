'use strict';

const knex = require('knex');
const _ = require('lodash');
const config = require('../config');

/** Class providing ability to connect to db via knex */
class DbManager {
  /**
   * @function constructor
   * @description construct DbManager object
   * @param {Object} connection : connection details
   */
  constructor(connection = null) {
    if (_.isNil(connection)) {
      connection = config.dbCredentials.connection;
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
        min: config.dbCredentials.minPoolSize,
        max: config.dbCredentials.maxPoolSize,
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
   * @param {Object} connection : connection details
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
