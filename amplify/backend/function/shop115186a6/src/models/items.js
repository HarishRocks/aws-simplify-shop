const BaseDB = require("./base");

class ItemsDB extends BaseDB {
    constructor() {
        super("items");
    }

    async batchGet(items) {
        const itemKeys = items.map(item => ({ id: item.id }));
        const responses = (await super.batchGetByKey(itemKeys)).Responses;
        const data = responses[this.getTableName()];
        const obj = new Map();
        data.forEach(d => obj.set(d.id, d));
        return obj;
    }

    async updateInventory(itemsData) {
        const itemsArray = Array.from(itemsData, ([k, v]) => v);
        const responses = await Promise.all(itemsArray.map(async item => {
            const params = {
                TableName: super.getTableName(),
                Key: { id: item.id },
                AttributeUpdates: {
                    'quantity': {
                        Action: 'PUT',
                        Value: item.quantity
                    }
                },
            };
            return BaseDB.dynamoDB.update(params).promise();
        }));
    }
}

module.exports = ItemsDB;