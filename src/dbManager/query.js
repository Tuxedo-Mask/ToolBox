const { dbConfiguration } = require("../config");
const log = require("../logger");

/**
 *
 * @param {object} conn - db connection object
 * @param {string} sql - query
 * @param guid - Id used inside logs
 * @returns {Promise<*>}
 * @private
 */
async function query (conn, sql, guid = null) {
  log.info(`SQL: ${sql}`, guid);
  return new Promise((resolve, reject) => {
    conn.query({sql, timeout: dbConfiguration.queryTimeout }, (error, result) => {
      if (error) {
        error.message = `sql query failed: ${error.message}`;
        log.error(error.message, guid);
        return reject(error);
      }
      resolve(result);
    });
  });
}

module.exports = query;
