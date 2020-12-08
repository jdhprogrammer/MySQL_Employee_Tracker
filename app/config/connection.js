var mysql = require("mysql");
const util = require("util")
    // Set up our connection information
var connection = mysql.createConnection({
    port: 3306,
    host: "localhost",
    user: "root",
    password: "",
    database: "companyInc_db"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    // application();
});

connection.query = util.promisify(connection.query)
    // Export connection
module.exports = connection;