const dbs = require("../models");

class OrderController {
    async getUserOrders(req, res) {
        const { user } = req.query;
        const orders = await dbs.orders.getByUser(user);
        res.json(orders);
    }
    async placeOrder(req, res) {
        const { items, user } = req.body;
        const sum = items.reduce((prev, cur) => (prev + cur.price * cur.qty), 0);
        const order = await dbs.orders.insert({
            id: dbs.orders.getRandomId(),
            items,
            user,
            sum,
            cancelled: false
        });
        res.json(order);
    }
    async cancelOrder(req, res) {
        const { order } = req.body;
        const resp = await dbs.orders.cancel(order);
        // const resp = await dbs.orders.get(order);
        res.json(resp);
    }
}
const ordersController = new OrderController();
module.exports = ordersController;