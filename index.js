// <--!$%#=+ MYSQL_Employee_Tracker +=#%$!--> \\

const mysql = require('mysql');
const inquirer = require('inquirer');
const banner = require('./library/banner');
const term = require("terminal-kit").terminal;
require('console.table');

const messageDisplay = require('./library/bigMessages');
// DISPLAY EMPLOYEE TRACKER WHEN STARTING THE APP ========>
messageDisplay.start();
console.log(banner);

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "rootroot",
    database: "companyInc_db",
});

connection.connect((err) => {
    if (err) throw err;
    welcome();
});

const welcome = () => {
    inquirer.prompt({
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices: [
            "Find songs by artist",
            "Find all artists who appear more than once",
            "Find data within a specific range",
            "Search for a specific song",
            "Find artists with a top song and top album in the same year"
        ]
    })
}



// viewAllEmployees

// SELECT e.id, e.first_name, e.last_name,
//     r.title, d.name as department, r.salary,
//     CONCAT(m.first_name, ' ', m.last_name) AS manager
// FROM employee e
// LEFT JOIN role r ON r.id = e.role_id
// LEFT JOIN department d ON d.id = r.department_id
// LEFT JOIN employee m ON m.id = e.manager_id
// ORDER BY d.id