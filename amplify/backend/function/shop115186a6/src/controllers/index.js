const itemsController = require('./item');
const usersController = require('./user');
const ordersController = require('./order');

const controllers = {
    items: itemsController,
    users: usersController,
    orders: ordersController
}

module.exports = controllers;