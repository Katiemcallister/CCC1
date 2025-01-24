const AbstractDataService = require('./AbstractDataService');

class JobRoleService extends AbstractDataService {
    constructor() {
        super();
        this.filePath = "data/jobRoles.json";
        this.plural = "job roles";
    }
}

module.exports = JobRoleService