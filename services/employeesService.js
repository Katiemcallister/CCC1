const fs = require('fs');

class EmployeeService {
    constructor() {
        this.filePath = "employees.json";
    }

    // Helper function to read users from JSON file
    _rawRead() {
        try {
            const data = fs.readFileSync(this.filePath, 'utf8');
            return JSON.parse(data);
        } catch (err) {
            console.error('Error reading employees:', err);
            return [];
        }
    }

    getAllEmployees() {
        return this._rawRead();
    }
}

module.exports = EmployeeService;