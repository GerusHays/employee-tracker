// global variables for db connection and console.table
const db = require('../db/connection');
const cTable = require('console.table');
// const for the rolequery when "talking" to SQL
const roleQuery = `SELECT r.id ID, r.title Title, department.name Department, r.salary Salary
                    FROM roles r
                    LEFT JOIN department ON r.department_id = department.id`;
// get the roles Table
const roleTable = () => {
    return db.promise().query(roleQuery)
        .then(([rows]) => {
            console.table(rows);
        });
};
// get the roles in order by title
const getRoles = async () => {
    const roleQuery = `SELECT r.id ID, r.title Title, department.name Department, r.salary Salary
                        FROM roles r
                        LEFT JOIN department ON r.department_id = department.id
                        ORDER BY r.title`;
// normal async try catch with a promise you will see throughout
    try {
        const role = await db.promise().query(roleQuery)
        return role[0].map(item => item.Title);
    } catch (err) {
        console.log(err);
    }
};
// be able to search the role based on the title 
const searchRole = async (title) => {
    try {
        const role = await db.promise().query(`SELECT id FROM roles WHERE title = '${title}'`)
        return role[0][0].id;
    } catch (err) {
        console.log(err);
    }
};
// adding a new role to the table and inserting it
const anotherRole = async (newRole) => {
    const sql = `INSERT INTO roles (title, salary, department_id) VALUES ('${newRole.title}', ${newRole.salary}, ${newRole.departmentId})`;
    try {
        const role = await db.promise().query(sql)
        console.log(`Added ${newRole.title} to the database.`);
    }
    catch (err) {
        console.log(err);
    }
};
// deleting a role from where the id is
const deleteRole = async (roleId) => {
    const sql = `DELETE FROM roles WHERE id = ${roleId}`;
    try {
        const role = await db.promise().query(sql)
        console.log(`Removed roles from the database.`);
    }
    catch (err) {
        console.log(err);
    }
};


// exporting the functions
module.exports = { roleTable, getRoles, searchRole, anotherRole, deleteRole }