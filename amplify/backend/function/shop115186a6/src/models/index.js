const UsersDB = require('./users');

const dbs = {
    users: new UsersDB()
};

module.exports = dbs;