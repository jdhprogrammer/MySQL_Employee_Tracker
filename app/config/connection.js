var mysql = require("mysql");

// Set up our connection information
var connection = mysql.createConnection({
    port: 3306,
    host: "localhost",
    user: "root",
    password: "",
    database: "companyInc_db"
});

// Export connection
module.exports = connection;