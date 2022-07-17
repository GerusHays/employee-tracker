const inquirer = require("inquirer");
const { showTable, getDepartment, anotherDepartment, deleteDepartment, findDepartment} = require("../queries/departmentQuery");

class employeeTracker {
    constructor() {
        this.employees = [];
    }

    homePage() {
        const options = [
            "View All Employees",
            "View All Roles",
            "View All Departments",
            "View Employees by Manager",
            "Add an Employee",
            "Add a Role",
            "Add a Department",
            "Update an Employee's Role",
            "Delete an Employee",
            "Delete a Role",
            "Delete a Department",
            "Exit",
        ];
        const homePageOptions = [
            {
                type: "list",
                name: "choice",
                message: "Access your Employee Tracker!?",
                choices: options
            }
        ];
        inquirer.prompt(homePageOptions).then(({ choice }) => {
            switch (choice) {
                case 'View All Departments':
                    this.displayDepartments();
                    break;
                case 'Exit':
                    console.log('Goodbye!');
                    process.exit();
                    break;
            }
        });
    }

    displayDepartments() {
        console.log('Departments list');
        getDepartment().then(data => {
            console.table(data);
        });
        this.homePage();
    }

};

module.exports = employeeTracker;