// jobRoleService.js
const fs = require('fs');

class JobRoleService {
    constructor() {
        this.filePath = "jobRoles.json";
    }

    // Helper function to read jobRoles from JSON file
    readJobRoles() {
        try {
            const data = fs.readFileSync(this.filePath, 'utf8');
            return JSON.parse(data);
        } catch (err) {
            console.error('Error reading jobRoles:', err);
            return [];
        }
    }

    // Helper function to write jobRoles to JSON file
    writeJobRoles(jobRoles) {
        try {
            fs.writeFileSync(this.filePath, JSON.stringify(jobRoles, null, 2), 'utf8');
        } catch (err) {
            console.error('Error writing jobRoles:', err);
        }
    }

    // Get all jobRoles
    getAllJobRoles() {
        return this.readJobRoles();
    }

    // Get a jobRole by ID
    getJobRoleById(id) {
        const jobRoles = this.readJobRoles();
        return jobRoles.find(jobRole => jobRole.id === id);
    }

    // Create a new jobRole
    createJobRole(newJobRole) {
        const jobRoles = this.readJobRoles();
        newJobRole.id = jobRoles.length ? jobRoles[jobRoles.length - 1].id + 1 : 1;
        jobRoles.push(newJobRole);
        this.writeJobRoles(jobRoles);
        return newJobRole;
    }

    // Update a jobRole by ID
    updateJobRole(id, updatedJobRole) {
        const jobRoles = this.readJobRoles();
        const jobRoleIndex = jobRoles.findIndex(jobRole => jobRole.id === id);
        if (jobRoleIndex === -1) return null;

        updatedJobRole.id = id;
        jobRoles[jobRoleIndex] = updatedJobRole;
        this.writeJobRoles(jobRoles);
        return updatedJobRole;
    }

    // Delete a jobRole by ID
    deleteJobRole(id) {
        const jobRoles = this.readJobRoles();
        const jobRoleIndex = jobRoles.findIndex(jobRole => jobRole.id === id);
        if (jobRoleIndex === -1) return null;

        const deletedJobRole = jobRoles.splice(jobRoleIndex, 1);
        this.writeJobRoles(jobRoles);
        return deletedJobRole[0];
    }
}

module.exports = JobRoleService;
