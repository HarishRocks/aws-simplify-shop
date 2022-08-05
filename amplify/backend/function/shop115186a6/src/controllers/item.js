const dbs = require("../models");

class ItemController {
    async getAll(req, res) {
        try {
            const items = await dbs.items.getAll();
            res.json(items);
        } catch (e) {
            res.json(e);
        }
    }
}
const itemsController = new ItemController();
module.exports = itemsController;