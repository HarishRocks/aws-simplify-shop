const BaseDB = require("./base");

class OrdersDB extends BaseDB {
    constructor() {
        super("orders");
    }
    async getByUser(user, showCancelled = false) {
        const params1 = {
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
        const params2 = {
            TableName: super.getTableName(),
            ExpressionAttributeNames: {
                '#user': 'user'
            }
            , ExpressionAttributeValues: {
                ':userEmail': user
            }, FilterExpression: '#user = :userEmail'
        }
        const data = await BaseDB.dynamoDB.scan(showCancelled ? params2 : params1).promise();
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