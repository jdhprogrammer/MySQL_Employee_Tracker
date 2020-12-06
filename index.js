// <--!$%#=+ MYSQL_Employee_Tracker +=#%$!--> \

const {
    application
} = require('./app.js')
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
// Connect to the database
connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    application();
});