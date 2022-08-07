const BaseDB = require("./base");

class OrdersDB extends BaseDB {
    constructor() {
        super("orders");
    }
    async getByUser(user, showCancelled = false) {
        const params = {
            TableName: super.getTableName(),
            ExpressionAttributeNames: {
                '#user': 'user',
                '#cancelled': 'cancelled'
            }
            , ExpressionAttributeValues: {
                ':userEmail': user,
                ':showCancelled': showCancelled
            }, FilterExpression: '#user = :userEmail AND #cancelled = :showCancelled'
        };
        const data = await BaseDB.dynamoDB.scan(params).promise();
        return data.Items;
    }
    async cancel(orderId) {
        const params = {
            TableName: super.getTableName(),
            Key: { id: orderId },
            AttributeUpdates: {
                'cancelled': {
                    Action: 'PUT',
                    Value: true
                },
                'cancelledAt': {
                    Action: 'PUT',
                    Value: (new Date()).getTime()
                }
            }
        };
        const data = await BaseDB.dynamoDB.update(params).promise();
        return data;
    }
}

module.exports = OrdersDB;