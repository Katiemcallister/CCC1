const AbstractDataService = require('./AbstractDataService');
const fs = require('fs');

class EmployeeService extends AbstractDataService {
    constructor() {
        super();
        this.filePath = "data/employees.json";
        this.plural = "employees";
    }
}

module.exports = EmployeeService;