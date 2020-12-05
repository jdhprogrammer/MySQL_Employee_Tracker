// <--!$%#=+ MYSQL_Employee_Tracker +=#%$!--> \\
const connection = require("./app/config/connection.js")
const app = require('./app/public/app.js')

// Connect to the database
function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    application();
};