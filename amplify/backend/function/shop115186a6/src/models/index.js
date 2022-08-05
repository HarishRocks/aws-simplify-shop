const OrdersDB = require('./orders');
const ItemsDB = require('./items');
const UsersDB = require('./users');

const dbs = {
    users: new UsersDB(),
    items: new ItemsDB(),
    orders: new OrdersDB()
};

module.exports = dbs;