const dbs = require("../models");

class OrderController {
    async getUserOrders(req, res) {
        const { user, showCancelled } = req.query;
        const orders = await dbs.orders.getByUser(user, showCancelled);
        res.json({ empty: orders?.length === 0, orders });
    }
    async placeOrder(req, res) {
        const { items, user } = req.body;
        const itemsData = await dbs.items.batchGet(items);
        const isSufficientInventory = items.every(item => {
            return itemsData.get(item.id).quantity >= item.qty;
        });
        if (!isSufficientInventory) {
            res.json({ success: false, message: 'All items in this order are not available' });
        }

        const sum = items.reduce((prev, cur) => (prev + itemsData.get(cur.id).price * cur.qty), 0);
        const orderId = dbs.orders.getRandomId();
        const resp = await dbs.orders.insert({
            id: orderId,
            items,
            user,
            sum,
            cancelled: false
        });
        res.json({ success: !!resp, orderId });
        // dbs.items.updateInventory(items);
    }
    async cancelOrder(req, res) {
        const { order } = req.body;
        const resp = await dbs.orders.cancel(order);
        res.json({ success: !!resp });
    }
}
const ordersController = new OrderController();
module.exports = ordersController;