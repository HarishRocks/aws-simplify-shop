const BaseDB = require("./base");

class ItemsDB extends BaseDB {
    constructor() {
        super("items");
    }
}

module.exports = ItemsDB;