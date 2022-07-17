// global variables for connection and the console table
const db = require('../db/connection');
const cTable = require('console.table');
// query for the employee sql message
const employeeQuery = `SELECT e.id AS ID, CONCAT(e.first_name, ' ', e.last_name) AS Employee, roles.title AS Title, department.name AS Department, roles.salary AS Salary, CONCAT(m.first_name, ' ', m.last_name) AS Manager
                        FROM employee e
                        LEFT JOIN roles ON e.roles_id = roles.id
                        LEFT JOIN department ON roles.department_id = department.id
                        LEFT JOIN employee m ON m.id = e.manager_id`;
// showing the employee table
const showEmployee = () => {
    db.promise().query(employeeQuery)
        .then(([rows]) => {
            console.table(rows);
        });
};
// ordering the employees by last name getting them to show up
const getEmployee = async () => {
    const sql = `SELECT e.id AS ID, CONCAT(e.first_name, ' ', e.last_name) AS Employee, roles.title AS Title, department.name AS Department, roles.salary AS Salary, CONCAT(m.first_name, ' ', m.last_name) AS Manager
             FROM employee e
             LEFT JOIN roles ON e.roles_id = roles.id
             LEFT JOIN department ON roles.department_id = department.id
             LEFT JOIN employee m ON m.id = e.manager_id
             ORDER BY e.last_name`;
    // normal async try catch with a promise
    try {
        const employee = await db.promise().query(sql)
        return employee[0].map(item => item.Employee);
    } catch (err) {
        console.log(err);
    }
};
// adding another employee function 
const anotherEmployee = async (employee) => {
    // try catch for where to insert the new employee inputted by the user with their name role and manager ID
    try {
        const addEmployee = await db.promise().query(`INSERT INTO employee (first_name, last_name, roles_id, manager_id) VALUES ('${employee.firstName}', '${employee.lastName}', ${employee.roleId}, ${employee.managerId})`)
        console.log(`Added ${employee.firstName} ${employee.lastName} to the database.`);
    } catch (err) {
        console.log(err);
    }
};
// function for updating the employee's role
const updateRole = async (employeeId, roleId) => {
    // try catch for where to update the employee's role in the table
    try {
        const employee = await db.promise().query(`UPDATE employee SET roles_id = ${roleId} WHERE id = ${employeeId}`)
        console.log(`Employee's role has been updated.`);
    } catch (err) {
        console.log(err);
    }
};
// function if you want to just search for one employee by their name 
const searchName = async (employeeName) => {
    try {
        const employee = await db.promise().query(`SELECT id FROM employee WHERE first_name = '${employeeName[0]}' AND last_name = '${employeeName[1]}'`)
        return employee[0][0].id;
    } catch (err) {
        console.log(err);
    }
};
// sorting the employee by whatever manager they are assigned to in our case there is only one manager 
const sortEmployeeByManager = async () => {
    const sql = `SELECT e.id AS ID, CONCAT(e.first_name, ' ', e.last_name) AS Employee, roles.title AS Title, department.name AS Department, roles.salary AS Salary, CONCAT(m.first_name, ' ', m.last_name) AS Manager
                 FROM employee e
                 LEFT JOIN roles ON e.roles_id = roles.id
                 LEFT JOIN department ON roles.department_id = department.id
                 LEFT JOIN employee m ON m.id = e.manager_id
                 ORDER BY m.last_name`;
    try {
        db.promise().query(sql)
        .then(([rows]) => {
            console.table(rows);
        });
    } catch (err) {
        console.log(err);
    }
};
// function to delete an employee 
const deleteEmployee = async (employeeId) => {
    // sql const for where to delete the employee from 
    const sql = `DELETE FROM employee WHERE id = ${employeeId}`;
    try {
        const employee = await db.promise().query(sql)
        // log for confirmation of the deleted employee
        console.log(`Employee has been deleted.`);
    } catch (err) {
        console.log(err);
    }
};

// exporting all of the functions
module.exports = { showEmployee, getEmployee, anotherEmployee, updateRole, searchName, sortEmployeeByManager, deleteEmployee }