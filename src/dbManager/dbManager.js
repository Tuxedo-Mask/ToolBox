"use strict";

const { dbCredentials } = require("../config");
const mysql = require("mysql");
const logger = require("../logger")();

/**
 *
 * @param {object} conn - db connection object
 * @param {string} sql - query
 * @param guid - Id used inside logs
 * @returns {Promise<*>}
 * @private
 */
const Query = async function query (conn, sql, guid = null) {
  logger.info(`SQL: ${sql}`, guid);
  return new Promise((resolve, reject) => {
    conn.query({ sql, timeout: 1000 }, (error, result) => {
      if (error) {
        error.message = `sql query failed: ${error.message}`;
        logger.error(error.message, guid);
        return reject(error);
      }
      resolve(result);
    });
  });
};

module.exports = () => {
  return {
    Query: Query,
    Test: async () => {
      logger.info("Testing DB");

      // HH::TODO why this const does works? VZ::Please take a look
      const con = mysql.createConnection({
        host: dbCredentials.host,
        user: dbCredentials.user,
        password: dbCredentials.password
      });

      const createTestDBScript = "CREATE DATABASE IF NOT EXISTS testDB";
      await Query(con, createTestDBScript);
      con.changeUser({database: dbCredentials.database}, function (err) {
        if (err) {
          throw err;
        }
      });
      // eslint-disable-next-line max-len
      const createTestUsersTableScript = "CREATE TABLE IF NOT EXISTS TestUsers (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), lastName VARCHAR(255))";
      await Query(con, createTestUsersTableScript);
      const clear = "DELETE FROM TestUsers WHERE id > 0";
      await Query(con, clear);
      const createTestUsersDataScript = "INSERT INTO TestUsers (name, lastName) VALUES ('Hayk', 'Hakobyan')";
      await Query(con, createTestUsersDataScript);
      const selectAll = "SELECT id, name, lastName FROM TestUsers WHERE id > 0";
      await Query(con, selectAll).then(result => {
        logger.info(JSON.stringify(result));
      });
      con.end();
    }
  };
};
