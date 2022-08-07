const dbs = require("../models");

class ItemController {
    async getAll(req, res) {
        const items = await dbs.items.getAll();
        res.json({ empty: items?.length === 0, items });
    }
}
const itemsController = new ItemController();
module.exports = itemsController;