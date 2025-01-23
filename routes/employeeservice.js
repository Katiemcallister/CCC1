class EmployeeService {
    constructor() {
      this.employees = [];
    }
  
    getAllEmployees() {
      return this.employees;
    }
  
    getEmployeeById(id) {
      return this.employees.find((employee) => employee.id === id);
    }
  
    updateEmployee(id, updatedData) {
      const index = this.employees.findIndex((employee) => employee.id === id);
      if (index === -1) return null;
  
      this.employees[index] = { ...this.employees[index], ...updatedData };
      return this.employees[index];
    }
  
    deleteEmployee(id) {
      const index = this.employees.findIndex((employee) => employee.id === id);
      if (index === -1) return null;
  
      return this.employees.splice(index, 1)[0];
    }
  }
  
  module.exports = EmployeeService;