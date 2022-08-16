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

    async updateInventory(items) {
        // const responses = await Promise.all(items.map(async item => {
        //     console.log('item', item);
        //     const itemData = (await super.getByKey({ id: item.id })).Item;
        //     if (itemData.quantity < item.qty)
        //         return false
        //     const params = {
        //         TableName: super.getTableName(),
        //         Key: { HashKey: item.id },
        //         UpdateExpression: 'set #a = :x + :y',
        //         ConditionExpression: '#a < :MAX',
        //         ExpressionAttributeNames: { '#a': 'Sum' },
        //         ExpressionAttributeValues: {
        //             ':x': 20,
        //             ':y': 45,
        //             ':MAX': 100,
        //         }
        //     };
        // }));
        // const itemIds = items.map(i => { id: i.id });
        // const itemData = (await super.batchGetByKey(itemIds)).Responses;
        // console.log(itemData);
        // return true;
    }
}

module.exports = ItemsDB;