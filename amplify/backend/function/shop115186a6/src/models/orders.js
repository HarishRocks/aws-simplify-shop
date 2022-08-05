const BaseDB = require("./base");

class OrdersDB extends BaseDB {
    constructor() {
        super("orders");
    }
    async getByUser(user) {
        const params = {
            TableName: super.getTableName(),
            ExpressionAttributeNames: {
                '#user': 'user',
            }
            , ExpressionAttributeValues: {
                ':userEmail': user,
            }, FilterExpression: '#user = :userEmail'
        };
        const data = await BaseDB.dynamoDB.scan(params).promise();
        return data.Items;
    }
}

module.exports = OrdersDB;