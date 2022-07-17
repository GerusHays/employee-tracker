const db = require('../db/connection');
const cTable = require('console.table');

// global variables for SQL
const displayTable = `SELECT * FROM department`;

// const function to get the table to display in rows
const getTable = () => {
    // return a promise in the database 
    return db.promise().query(displayTable).then(([rows]) => {
        return rows;
    });
};
// shows table to the user via console logs
const showTable = () => {
    // run getTable() and console log the data to show the department table
    getTable().then(data => {
        console.table(data);
    });
};
// get the department by the name
const getDepartment = async() => {
    const dName = `SELECT name FROM department
    ORDER BY name`;
    // try catch 
    try {
        // await with the db promise to get the department name from dName
        const department = await db.promise().query(dName)
        // returning the department and mapping the item to be the name
        return department[0].map(item => item.name);
        // catch error
    } catch (err) {
        console.log(err);
    }
};
// ADD function to add another department name
const anotherDepartment = async(name) => {
    // sql variable to insert making a new department name
    const sql = `INSERT INTO department (name) VALUES ('${name}')`;
    // try catch
    try {
        // add const for the await db promise querying to sql
        const add = await db.promise().query(sql);
        // console log to display to the user their department was added to the table
        console.log(`Added ${name} to the list of departments`);
        // catch if there was error adding the department
    } catch (err) {
        console.log(err);
    }
};
// DELETE function to delete a department
const deleteDepartment = async(name) => {
    // sql const to delete a department by the name
    const sql = `DELETE FROM department WHERE name = '${name}'`;
    // try catch
    try {
        // const deleted (since delete isnt allowed) for the db promise and query the sql 
        const deleted = await db.promise().query(sql);
        // console log to display to the user that the department was delete
        console.log(`Deleted department ${name}`);
    }
    // catch if there was an error deleting the department
    catch (err) {
        console.log(err);
    }
};
// const to find the department by the name
const findDepartment = async(name) => {
    const sql = `SELECT id FROM department WHERE name = '${name}'`;
    // try catch
    try {
        // find const with await and querying the sql to find the department 
        const find = await db.promise().query(sql)
        return find[0][0].id;
    // catch if there was an error finding the department
    } catch (err) {
        console.log(err);
    }
};
// exporting all of the functions
module.exports = {showTable, getDepartment, anotherDepartment, deleteDepartment, findDepartment};