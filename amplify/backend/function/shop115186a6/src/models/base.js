const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

class BaseDB {
    static dynamoDB;
    constructor(dbName) {
        this.tableName = dbName;
        if (process.env.ENV && process.env.ENV !== "NONE") {
            this.tableName = this.tableName + '-' + process.env.ENV;
        }
        console.log('tableName', this.tableName);
    }
    async getAll() {
        const data = await dynamoDB.scan({
            TableName: this.tableName
        }).promise();
        return data.Items;
    }
    async insert(item) {
        const putItemParams = {
            TableName: this.tableName,
            Item: item
        }
        const data = await dynamoDB.put(putItemParams).promise();
        return data;
    }
};


module.exports = BaseDB;
