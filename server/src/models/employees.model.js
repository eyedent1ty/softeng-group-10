const db = require('../../database/db');

let employees = [];

function loadEmployees() {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM employees';

    db.all(sql, [], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        rows.forEach((row) => employees.push(row));
        resolve();
      }
    });
  });
}

function getAllEmployees() {
  return employees;
}

function getEmployeeById(id) {
  return employees.find((employee) => (employee.id === id));
}

function addNewEmployee(newEmployee) {
  return employees.push(newEmployee);
}

module.exports = {
  loadEmployees,
  getAllEmployees,
  getEmployeeById,
  addNewEmployee
};
