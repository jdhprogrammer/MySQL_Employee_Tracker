// Dependencies
const inquirer = require('inquirer');
const term = require("terminal-kit").terminal;
require('console.table');
const util = require("util");
// Imports
const connection = require('./app/config/connection.js');
const bigMessage = require('./app/library/bigMessages');
const banner = require('./app/library/banner');

// Conditions
application();
// Main Application
function application() {

    let query;
    // Figliet Welcome
    bigMessage.welcome();
    // DISPLAY EMPLOYEE TRACKER WHEN STARTING THE APP ========>
    console.log(banner);
    // Inquirer CLI
    (async() => {

        const queries = {
            //    "View All Employees":
            getAllEmployees: async(search) => {
                let queryString = "SELECT * from ??"
                return connection.query(queryString, search)
            },
            // "View All EmployeesABC":
            getAllEmployeesABC: async(search) => {
                let queryString = "SELECT employee.id, first_name, last_name, role.title, department.name as department,"
                queryString += " salary FROM companyInc_db.employee inner join role inner join "
                queryString += "department on role.id = employee.role_id AND department.id = "
                queryString += "role.department_id order by ??";
                return connection.query(queryString, search)
            },
            // "View All Employees123":
            getAllEmployees123: async(search) => {
                let queryString = "SELECT employee.id, first_name, last_name, role.title, department.name as department,"
                queryString += " salary FROM companyInc_db.employee inner join role inner join "
                queryString += "department on role.id = employee.role_id AND department.id = "
                queryString += "role.department_id order by ??";
                return connection.query(queryString, search)
            },
            //    "View All Employees by Department":
            getEmployeesByDepartment: async(search) => {
                let queryString = "SELECT employee.id, first_name, last_name, role.title, department.name as department,"
                queryString += " salary FROM companyInc_db.employee inner join role inner join "
                queryString += "department on role.id = employee.role_id AND department.id = "
                queryString += "role.department_id order by ??";
                return connection.query(queryString, search)
            },
            //    "View All Employees by Manager":
            getEmployeesByManager: async(search) => {
                let queryString = "SELECT e.id, e.first_name, e.last_name, r.title, d.name as department, r.salary, "
                queryString += "CONCAT(m.first_name, ' ', m.last_name) AS manager FROM employee e "
                queryString += "LEFT JOIN role r ON r.id = e.role_id LEFT JOIN department d ON d.id = r.department_id "
                queryString += "LEFT JOIN employee m ON m.id = e.manager_id ORDER BY ?? "
                return connection.query(queryString, search)
            },
            //    "Add Employee":
            postNewEmployee: async({ firstName, lastName, roleId, managerId }) => {
                let queryString = "INSERT INTO employee SET ?";
                return connection.query(queryString, {
                    first_name: firstName,
                    last_name: lastName,
                    role_id: roleId,
                    manager_id: managerId
                });
            },
            //    "Remove Employee":
            deleteEmployee: async({ employeeId }) => {
                let queryString = "DELETE FROM employee WHERE ?";
                return connection.query(queryString, [
                    { id: employeeId }
                ]);
            },
            //    "Update Employee Role":
            updateEmployeeRole: async({ roleId, employeeId }) => {
                let queryString = "UPDATE employee SET ? WHERE ?";
                return connection.query(queryString, [
                    { role_id: roleId },
                    { id: employeeId }
                ]);
            },
            //    "Update Employee Manager":
            updateEmployeeManager: async({ managerId, employeeId }) => {
                let queryString = "UPDATE employee SET ? WHERE ?";
                return connection.query(queryString, [
                    { manager_id: managerId },
                    { id: employeeId }
                ]);
            },
            //    "View All Departments":
            getAllDepartments: async(search) => {
                let queryString = "SELECT * from ??";
                return connection.query(queryString, search)
            },
            getDepartment: async(search) => {
                let queryString = "SELECT name FROM department WHERE ?";
                return connection.query(queryString, [
                    { id: search }
                ]);
            },
            //    "Add Department":
            postNewDepartment: async({ deptName }) => {
                let queryString = "INSERT INTO department SET ?";
                return connection.query(queryString, { name: deptName });
            },
            //    "Remove Department":
            deleteDepartment: async({ deptId }) => {
                let queryString = "DELETE FROM department WHERE ?";
                return connection.query(queryString, [
                    { id: deptId }
                ]);
            },
            //    "View All Roles":
            getAllRoles: async(search) => {
                let queryString = "SELECT * from ??"
                return connection.query(queryString, search)
            },
            //    "View a Role":
            getRole: async(search) => {
                let queryString = "SELECT title FROM Role WHERE ?";
                return connection.query(queryString, [
                    { id: search }
                ]);
            },
            //    "Add Role":
            postNewRole: async({ roleName, salary, departmentId }) => {
                let queryString = "INSERT INTO role SET ?";
                return connection.query(queryString, {
                    title: roleName,
                    salary: salary,
                    department_id: departmentId
                });
            },
            //    "Remove Role":
            deleteRole: async({ roleId }) => {
                let queryString = "DELETE FROM role WHERE ?";
                return connection.query(queryString, [
                    { id: roleId }
                ]);
            },
            //    "View Department Utilized Budget":
            getDepartmentUsedBudget: async() => {
                let queryString = "SELECT department.name, SUM(salary) AS utilized_budget FROM department "
                queryString += "LEFT JOIN role ON role.department_id = department.id GROUP BY department.name;";
                return connection.query(queryString);
            },
        }

        let runApplication = true;

        while (runApplication) {

            const {
                doSomething
            } = await inquirer.prompt({
                name: "doSomething",
                type: "list",
                message: "What would you like to do?",
                choices: [
                    "View All Employees: Alphabetically",
                    "View All Employees: by ID #",
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
                    "View Department Utilized Budget",
                    "Exit"
                ]
            });

            switch (doSomething) {
                case "View All Employees: Alphabetically":
                    {
                        const employeesABC = await queries.getAllEmployeesABC("first_name");
                        console.log("------------------------------------------------------------------------------------");
                        console.table(employeesABC);
                        console.log("------------------------------------------------------------------------------------");

                        break;
                    }
                case "View All Employees: by ID #":
                    {
                        const employees123 = await queries.getAllEmployees123("id");
                        console.log("------------------------------------------------------------------------------------");
                        console.table(employees123);
                        console.log("------------------------------------------------------------------------------------");
                        break;
                    }
                case "View All Employees by Department":
                    {
                        const byDepartment = await queries.getEmployeesByDepartment("department_id");
                        console.log("------------------------------------------------------------------------------------");
                        console.table(byDepartment);
                        console.log("------------------------------------------------------------------------------------");
                    }
                    break;
                case "View All Employees by Manager":
                    {
                        const byManagers = await queries.getEmployeesByManager("m.id");
                        console.log("------------------------------------------------------------------------------------");
                        console.table(byManagers);
                        console.log("------------------------------------------------------------------------------------");
                    }
                    break;
                case "Add Employee":
                    {
                        const roles = await queries.getAllRoles("role");
                        const employees = await queries.getAllEmployees("employee");

                        const answers = await inquirer.prompt([{
                                name: "firstName",
                                type: "input",
                                message: "What is the employee's First Name?",
                                validate: (name) => /^[a-zA-ZäöüßÄÖÜ]+$/.test(name) || 'Please enter a valid name.'
                            },
                            {
                                name: "lastName",
                                type: "input",
                                message: "What is the employee's Last Name?",
                                validate: (name) => /^[a-zA-ZäöüßÄÖÜ]+$/.test(name) || 'Please enter a valid name.'
                            },
                            {
                                name: "roleId",
                                type: "list",
                                message: "What is the employee's role?",
                                choices: roles.map(({
                                    id,
                                    title
                                }) => ({
                                    name: title,
                                    value: id
                                }))
                            },
                            {
                                name: "questionAddManager",
                                type: "confirm",
                                message: "Would you like to add this employee's manager?",
                                default: false
                            },
                            {
                                when: ({
                                    questionAddManager
                                }) => questionAddManager,
                                name: "managerId",
                                type: "list",
                                message: "Who is the employee's manager?",
                                choices: employees.map(({
                                    id,
                                    first_name,
                                    last_name
                                }) => ({
                                    name: `${first_name} ${last_name}`,
                                    value: id
                                }))
                            }
                        ]);
                        const newEmployee = await queries.postNewEmployee(answers);
                        console.log("------------------------------------------------------------------------------------");
                        console.log(`WELCOME to the Team - ${answers.firstName} ${answers.lastName}!`)
                        console.log("------------------------------------------------------------------------------------");
                        break;
                    }
                case "Remove Employee":
                    {
                        const employees = await queries.getAllEmployees("employee");
                        const answers = await inquirer.prompt([{
                            name: "employeeId",
                            type: "list",
                            message: "Choose the employee you would like to delete",
                            choices: employees.map(({ id, first_name, last_name }) => ({ name: `${first_name} ${last_name}`, value: id }))
                        }, ])
                        const removeEmp = await queries.deleteEmployee(answers);
                        console.log("------------------------------------------------------------------------------------");
                        console.table(`Employee was removed successfully.`);
                        console.log("------------------------------------------------------------------------------------");
                        break;
                    }
                case "Update Employee Role":
                    {
                        const [roles, employees] = await Promise.all([queries.getAllRoles("role"), queries.getAllEmployees("employee")]);
                        const answers = await inquirer.prompt([{
                                name: "employeeId",
                                type: "list",
                                message: "Choose the employee for whom you would like to update the role",
                                choices: employees.map(({ id, first_name, last_name }) => ({ name: `${first_name} ${last_name}`, value: id }))
                            },
                            {
                                name: "roleId",
                                type: "list",
                                message: "Select a new role for the employee",
                                choices: roles.map(({ id, title }) => ({ name: title, value: id }))
                            },
                        ])
                        const roleUpdate = await queries.updateEmployeeRole(answers);
                        console.log("------------------------------------------------------------------------------------");
                        console.table('Role updated successfully.');
                        console.log("------------------------------------------------------------------------------------");
                        break;
                    }
                case "Update Employee Manager":
                    {
                        const employees = await queries.getAllEmployees("employee");
                        const answers = await inquirer.prompt([{
                                name: "employeeId",
                                type: "list",
                                message: "Choose the employee for whom you would like to update the manager",
                                choices: employees.map(({ id, first_name, last_name }) => ({ name: `${first_name} ${last_name}`, value: id }))
                            },
                            {
                                name: "managerId",
                                type: "list",
                                message: "Select a new manager for the employee",
                                choices: employees.map(({ id, first_name, last_name }) => ({ name: `${first_name} ${last_name}`, value: id }))
                            },
                        ]);
                        const managerUpdate = await queries.updateEmployeeManager(answers);
                        console.log("------------------------------------------------------------------------------------");
                        console.table(`Employee manager updated successfully.`);
                        console.log("------------------------------------------------------------------------------------");
                        break;
                    }
                case "View All Departments":
                    {
                        const departments = await queries.getAllDepartments("department");
                        console.log("------------------------------------------------------------------------------------");
                        console.table(departments);
                        console.log("------------------------------------------------------------------------------------");
                        break;
                    }
                case "Add Department":
                    {
                        const depts = await queries.getAllDepartments("department");
                        console.table(depts)
                        const answers = await inquirer.prompt([{
                            name: "deptName",
                            type: "input",
                            message: "What is the department you would like to add?",
                            // validate: (name) => { for for (const dept of depts) { if (dept.name.toLowerCase().split(" ").includes(name.toLowerCase())) { console.log(`\n${name} department already exists`); return false; } } }
                        }])
                        const newDept = await queries.postNewDepartment(answers)
                        console.log("------------------------------------------------------------------------------------");
                        console.table(`Department "${answers.deptName}" was added successfully!`);
                        console.log("------------------------------------------------------------------------------------");
                        break;
                    }
                case "Remove Department":
                    {
                        const departments = await queries.getAllDepartments("department");
                        const answers = await inquirer.prompt([{
                            name: "deptId",
                            type: "list",
                            message: "Choose the department you would like to delete",
                            choices: departments.map(({ id, name }) => ({ name: name, value: id }))
                        }, ]);
                        const removedDept = await queries.getDepartment(answers.deptId)
                        dept = JSON.parse(JSON.stringify(removedDept[0].name))
                        const removeDept = await queries.deleteDepartment(answers);
                        console.log("------------------------------------------------------------------------------------");
                        console.table(`Department "${dept}" has been removed successfully.`);
                        console.log("------------------------------------------------------------------------------------");
                        break;
                    }
                case "View All Roles":
                    {
                        const roles = await queries.getAllRoles("role");
                        console.log("------------------------------------------------------------------------------------");
                        console.table(roles);
                        console.log("------------------------------------------------------------------------------------");
                        break;
                    }
                case "Add Role":
                    {
                        const departments = await queries.getAllDepartments("department");
                        const roles = await queries.getAllRoles("role");
                        console.table(roles)
                        const answers = await inquirer.prompt([{
                                name: "departmentId",
                                type: "list",
                                message: "Which department would you like to add the role to?",
                                choices: departments.map(({ id, name }) => ({ name: name, value: id }))
                            },
                            {
                                name: "roleName",
                                type: "input",
                                message: "What is the role you would like to add?",
                                // validate: (name) => { for (const role of roles) { if (role.title.toLowerCase().split(" ").includes(name.toLowerCase())) { console.log(`\n${name} role already exists`); return false; } } }
                            },
                            {
                                name: "salary",
                                type: "input",
                                message: "What is the annual salary for this role?",
                                validate: (salary) => !isNaN(salary) && /^[0-9]+$/.test(salary) || 'Please enter a valid number.'
                            }
                        ])
                        const newRole = await queries.postNewRole(answers);
                        console.log("------------------------------------------------------------------------------------");
                        console.table(`Role "${answers.roleName}" has been added successfully!`);
                        console.log("------------------------------------------------------------------------------------");

                        break;
                    }
                case "Remove Role":
                    {
                        const roles = await queries.getAllRoles("role");
                        const answers = await inquirer.prompt([{
                            name: "roleId",
                            type: "list",
                            message: "Choose the role you would like to delete",
                            choices: roles.map(({ id, title }) => ({ name: title, value: id }))
                        }, ]);
                        const removedRole = await queries.getRole(answers.roleId)
                        role = JSON.parse(JSON.stringify(removedRole[0].title))
                        const removeRole = await queries.deleteRole(answers);
                        console.log("------------------------------------------------------------------------------------");
                        console.table(`Role "${role}" was removed successfully.`);
                        console.log("------------------------------------------------------------------------------------");
                        break;
                    }
                case "View Department Utilized Budget":
                    {
                        const viewBudget = await queries.getDepartmentUsedBudget();
                        console.log("------------------------------------------------------------------------------------");
                        console.table(viewBudget);
                        console.log("------------------------------------------------------------------------------------");
                        break;
                    }
                case "Exit":
                    {

                        bigMessage.goodbye();
                        runApplication = false;
                        break;
                    }
                default:
                    {
                        break
                    }
            }
        }
    })();
}