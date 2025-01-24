const AbstractDataService = require('./AbstractDataService');
const fs = require('fs');

class UserService extends AbstractDataService {
    constructor() {
        super();
        this.filePath = "data/users.json";
        this.plural = "users";
    }
}

module.exports = UserService;
