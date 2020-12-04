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
            "View All Employees",
            "View All Employees by Department",
            "View All Employees by Manager",
            "Add Employee",
            "Remove Employee",
            "Update Employee Role",
            "Update Employee Manager",
            "View All Departments",
            "Add Department",
            "Remove Department",
            "View All Roles",
            "Add Role",
            "Remove Role",
            "Exit"
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