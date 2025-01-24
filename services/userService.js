const AbstractDataService = require('./AbstractDataService');

class UserService extends AbstractDataService {
    constructor() {
        super();
        this.filePath = "data/users.json";
        this.plural = "users";
    }
}

module.exports = UserService;
