const { dbCredentials } = require('../config');
const mysql = require("mysql");
const logger = require('../logger')();

/**
 *
 * @param {object} conn - db connection object
 * @param {string} sql - query
 * @param guid - Id used inside logs
 * @returns {Promise<*>}
 * @private
 */
const Query = async function query(conn, sql, guid = null) {
  logger.info(`SQL: ${sql}`, guid);
  return new Promise((resolve, reject) => {
    conn.query({ sql, timeout: 1000 }, (error, result) => {
      // HH::TODO add db configconn.query({sql, timeout: dbConfiguration.queryTimeout }, (error, result) => {
      if (error) {
        error.message = `sql query failed: ${error.message}`;
        logger.error(error.message, guid);
        return reject(error);
      }
      resolve(result);
    });
  });
}

const CreateTestScheme = async (con) => {
  const createTestDBScript = "CREATE DATABASE IF NOT EXISTS testDB";
  await Query(con, createTestDBScript);
  logger.info("Database testDB created");
};

const CreateTestTable = async (con) => {
  const createTestUsersTableScript = "CREATE TABLE IF NOT EXISTS TestUsers (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), lastName VARCHAR(255))";
  await Query(con, createTestUsersTableScript);
  logger.info("Created Table TestUsers");
};

const DeleteAllData = async (con) => {
  const clear = "DELETE FROM TestUsers WHERE id > 0";
  await Query(con, clear);
  logger.info("Cleared TestUsers table");
};

const CreateTestData = async (con) => {
  const createTestUsersDataScript = "INSERT INTO TestUsers (name, lastName) VALUES ('Hayk', 'Hakobyan')";
  await Query(con, createTestUsersDataScript);
  logger.info("Added TestUsers Data");
};

const SelectAll = (con) => {
  const selectAll = "SELECT id, name, lastName FROM TestUsers WHERE id > 0";
  const promise = Query(con, selectAll);
  promise.then(
    result => logger.info(result),
    error => logger.info(error)
  );
  logger.info("Selected All");
};

module.exports = () => {
  return {
    Query: Query,
    CreateTestScheme: CreateTestScheme,
    CreateTestTable: CreateTestTable,
    DeleteAllData: DeleteAllData,
    CreateTestData: CreateTestData,
    SelectAll: SelectAll,
    Test: async () => {
      logger.info("Testing DB");

      const mysql = require("mysql");
      const con = mysql.createConnection({
        host: dbCredentials.host,
        user: dbCredentials.user,
        password: dbCredentials.password
      });

      const createTestDBScript = "CREATE DATABASE IF NOT EXISTS testDB";
      Query(con, createTestDBScript).then(
        result => {
          con1 = mysql.createConnection({
            host: dbCredentials.host,
            user: dbCredentials.user,
            password: dbCredentials.password,
            database: dbCredentials.database
          });
          con1.connect((err) => {
            if (err) {
              throw err;
            }
            logger.info("Connected to mysql DB!");

            CreateTestTable(con1);
            DeleteAllData(con1);
            CreateTestData(con1);
            SelectAll(con1);
          });
        }
      );
    }
  };
}
