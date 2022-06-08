const inquirer = require('inquirer');
const logo = require("asciiart-logo");
const db = require('./db/connection');
require('console.table');

const start = () => {
    const greeting = logo({
        name: "Employee Tracker",
    }).render();
    console.log(greeting);
    console.table('test');
};

// main menu prompt
// switch statements1`

start();