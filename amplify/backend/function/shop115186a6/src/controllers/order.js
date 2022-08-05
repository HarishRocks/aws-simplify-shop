const dbs = require("../models");

class OrderController {
    async getUserOrders(req, res) {
        const { user } = req.query;
        const orders = await dbs.orders.getByUser(user);
        const ordersFormatted = orders?.map(order => {
            order.items = JSON.parse(order.items);
            return order;
        })
        res.json(orders);
    }
    async placeOrder(req, res) {
        const { items, user } = req.body;
        const sum = JSON.parse(items).reduce((prev, cur) => (prev + cur.price * cur.qty), 0);
        const order = await dbs.orders.insert({
            id: dbs.orders.getRandomId(),
            items,
            user,
            sum
        });
        res.json(order);
    }
}
const ordersController = new OrderController();
module.exports = ordersController;