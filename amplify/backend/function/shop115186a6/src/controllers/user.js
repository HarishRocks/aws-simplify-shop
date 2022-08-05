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
        const done = dbs.users.insert(user);
        if (done)
            res.json(done);
        else
            res.send("error");
    }
}
const usersController = new UserController();
module.exports = usersController;