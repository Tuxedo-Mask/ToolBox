'use strict';

const {dbCredentials} = require('../config');
const mysql = require('mysql');
const logger = require('../logger')();

/**
 *
 * @param {object} conn - db connection object
 * @param {string} sql - query
 * @param {any} guid - Id used inside logs
 * @return {Promise<*>}
 * @private
 */
async function query(conn, sql, guid = null) {
  logger.info(`SQL: ${sql}`, guid);
  return new Promise((resolve, reject) => {
    conn.query({sql, timeout: 1000}, (error, result) => {
      if (error) {
        error.message = `sql query failed: ${error.message}`;
        logger.error(error.message, guid);
        return reject(error);
      }
      resolve(result);
    });
  });
}

module.exports = () => {
  return {
    query,
    test: async () => {
      logger.info('Testing DB');

      // HH::TODO why this const does works? VZ::Please take a look
      const con = mysql.createConnection({
        host: dbCredentials.host,
        user: dbCredentials.user,
        password: dbCredentials.password,
      });

      const createTestDBScript = 'CREATE DATABASE IF NOT EXISTS testDB';
      await query(con, createTestDBScript);
      con.changeUser({database: dbCredentials.database}, function(err) {
        if (err) {
          throw err;
        }
      });
      // eslint-disable-next-line max-len
      const createTestUsersTableScript = 'CREATE TABLE IF NOT EXISTS TestUsers (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), lastName VARCHAR(255))';
      await query(con, createTestUsersTableScript);
      const clear = 'DELETE FROM TestUsers WHERE id > 0';
      await query(con, clear);
      const createTestUsersDataScript = 'INSERT INTO TestUsers (name, lastName) VALUES (\'Hayk\', \'Hakobyan\')';
      await query(con, createTestUsersDataScript);
      const selectAll = 'SELECT id, name, lastName FROM TestUsers WHERE id > 0';
      await query(con, selectAll).then((result) => {
        logger.info(JSON.stringify(result));
      });
      con.end();
    },
  };
};
