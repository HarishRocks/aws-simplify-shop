const dbs = require("../models");

class UserController {
    async getAll(req, res) {
        const users = await dbs.users.getAll();
        res.json(users);
    }
    async addUser(req, res) {
        const user = {
            email: req.body.email,
            name: req.body.name
        }
        const resp = dbs.users.insert(user);
        res.json({ success: !!resp });
    }
}
const usersController = new UserController();
module.exports = usersController;