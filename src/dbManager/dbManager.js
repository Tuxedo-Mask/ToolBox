module.exports = () => {
    return {
        CreateTestScheme: (con) => {
            const createTestDBScript = "CREATE DATABASE IF NOT EXISTS testDB";
            con.query(createTestDBScript, function (err, result) {
                if (err) {
                    throw err;
                }
                console.log("Database testDB created");
            });
        },
        CreateTestTable: (con) => {
            const createTestUsersTableScript = "CREATE TABLE IF NOT EXISTS TestUsers (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), lastName VARCHAR(255))";

            con.query(createTestUsersTableScript, function (err, result) {
                if (err) {
                    throw err;
                }
                console.log("Created Table TestUsers");
            });
        },
        DeleteAllData: (con) => {
            var clear = "DELETE FROM TestUsers WHERE id > 0";

            con.query(clear, function (err, result) {
                if (err) {
                    throw err;
                }
                console.log("Cleared TestUsers table");
            });
        },
        CreateTestData: (con) => {
            var createTestUsersDataScript = "INSERT INTO TestUsers (name, lastName) VALUES ('Hayk', 'Hakobyan')";

            con.query(createTestUsersDataScript, function (err, result) {
                if (err) {
                    throw err;
                }
                console.log("Added TestUsers Data");
            });
        },
        SelectAll: (con) => {
            const selectAll = "SELECT id, name, lastName FROM TestUsers WHERE id > 0";

            con.query(selectAll, function (err, result) {
                if (err) {
                    throw err;
                }
                console.log("Selected All");
                console.log(result);
            });
        }
    };
}