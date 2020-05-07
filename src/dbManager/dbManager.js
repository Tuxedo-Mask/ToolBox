const { dbCredentials } = require('../config');
const mysql = require("mysql");
// HH::TODO const log = require('../logger');

/**
 *
 * @param {object} conn - db connection object
 * @param {string} sql - query
 * @param guid - Id used inside logs
 * @returns {Promise<*>}
 * @private
 */
const Query = async function query(conn, sql, guid = null) {
  //HH::TODO log.info(`SQL: ${sql}`, guid);
  return new Promise((resolve, reject) => {
    conn.query({ sql, timeout: 1000 }, (error, result) => {
      // HH::TODO add db configconn.query({sql, timeout: dbConfiguration.queryTimeout }, (error, result) => {
      if (error) {
        error.message = `sql query failed: ${error.message}`;
        //HH::TODO log.error(error.message, guid);
        return reject(error);
      }
      resolve(result);
    });
  });
}

const CreateTestScheme = (con) => {
  const createTestDBScript = "CREATE DATABASE IF NOT EXISTS testDB";
  Query(con, createTestDBScript);
  console.log("Database testDB created");
};

const CreateTestTable = (con) => {
  const createTestUsersTableScript = "CREATE TABLE IF NOT EXISTS TestUsers (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), lastName VARCHAR(255))";
  Query(con, createTestUsersTableScript);
  console.log("Created Table TestUsers");
};

const DeleteAllData = (con) => {
  const clear = "DELETE FROM TestUsers WHERE id > 0";
  Query(con, clear);
  console.log("Cleared TestUsers table");
};

const CreateTestData = (con) => {
  const createTestUsersDataScript = "INSERT INTO TestUsers (name, lastName) VALUES ('Hayk', 'Hakobyan')";
  Query(con, createTestUsersDataScript);
  console.log("Added TestUsers Data");
};

const SelectAll = (con) => {
  const selectAll = "SELECT id, name, lastName FROM TestUsers WHERE id > 0";
  const promise = Query(con, selectAll);
  promise.then(
    result => console.log(result),
    error => console.log(error)
  );
  console.log("Selected All");
};

module.exports = () => {
  return {
    Query: Query,
    CreateTestScheme: CreateTestScheme,
    CreateTestTable: CreateTestTable,
    DeleteAllData: DeleteAllData,
    CreateTestData: CreateTestData,
    SelectAll: SelectAll,
    Test: () => {
      console.log("Testing DB");

      const mysql = require("mysql");
      console.log(dbCredentials.user);
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
          con1.connect(function (err) {
            if (err) {
              throw err;
            }
            console.log("Connected to mysql DB!");

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
