const db = require('../db/connection');
const cTable = require('console.table');
// const function to get the roles title
const getRoles = (data) => { 
    // empty array for the roles 
    let roles = [];
    // shows only role title
    data.forEach(element => {
        roles.push(element.Title);
        
    });
};
// const function to view roles
const viewRoles = () => {
    // select the role information based on the id, title, department, salary and role then joining department
    const sql = `SELECT r.id ID, r.title Title, department.name Department, r.salary Salary
                 FROM role r
                 LEFT JOIN department ON r.department_id = department.id`;
    // promise and query to create rows from the roles
    db.promise().query(sql)
        .then(([rows]) => {
            getRoles(rows);
            console.table(rows);
        });
};
// const function to view employee information
const viewEmployees = () => {
    const sql = `SELECT e.id AS ID, CONCAT(e.first_name, ' ', e.last_name) AS Employee, role.title AS Title, department.name AS Department, role.salary AS Salary, CONCAT(m.first_name, ' ', m.last_name) AS Manager
    FROM employee e
    LEFT JOIN role ON e.role_id = role.id
    LEFT JOIN department ON role.department_id = department.id
    LEFT JOIN employee m ON m.id = e.manager_id`;
    // db query to generate rows and if there is an error it will log error otherwise will generate the table
    db.query(sql, (err, rows) => {
        if(err) {
            console.log(err);
        } else {
            console.table(rows);
        }
    });
};
// const function to view the department name
const viewDepartment = () => {
    // just selecting the department name
    const sql = `SELECT * FROM department`;
    // db query to generate rows and if there is an error it will log error otherwise will generate the table
    db.query(sql, (err, rows) => {
        if(err) {
            console.log(err);
        } else {
            console.table(rows);
        }
    });
};

module.exports = { viewRoles, viewEmployees, viewDepartment};