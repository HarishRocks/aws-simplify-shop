const dbs = require("../models");

class OrderController {
    async getUserOrders(req, res) {
        const { user, showCancelled } = req.query;
        const orders = await dbs.orders.getByUser(user, showCancelled);
        res.json({ empty: orders?.length === 0, orders });
    }
    async placeOrder(req, res) {
        const { items, user } = req.body;
        const sum = items.reduce((prev, cur) => (prev + cur.price * cur.qty), 0);
        const orderId = dbs.orders.getRandomId();
        const resp = await dbs.orders.insert({
            id: orderId,
            items,
            user,
            sum,
            cancelled: false
        });
        res.json({ success: !!resp, orderId });
    }
    async cancelOrder(req, res) {
        const { order } = req.body;
        const resp = await dbs.orders.cancel(order);
        res.json({ success: !!resp });
    }
}
const ordersController = new OrderController();
module.exports = ordersController;