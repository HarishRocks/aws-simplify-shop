const BaseDB = require("./base");

class UsersDB extends BaseDB {
    constructor() {
        super("users");
    }
}

module.exports = UsersDB;