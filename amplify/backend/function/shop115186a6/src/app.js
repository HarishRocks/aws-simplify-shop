const AWS = require('aws-sdk')
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
const bodyParser = require('body-parser')
const express = require('express')

const path = "/shop";
const controllers = require('./controllers');

// declare a new express app
const app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  next()
});

app.get(path, function (req, res) {
  res.send("Welcome to the Shop");
});


app.get(path + '/users', controllers.users.getAll);
app.post(path + '/user', controllers.users.addUser);

app.get(path + '/items', controllers.items.getAll);

app.get(path + '/orders', controllers.orders.getUserOrders);
app.post(path + '/order', controllers.orders.placeOrder);
app.post(path + '/order/cancel', controllers.orders.cancelOrder);

app.listen(3000, function () {
  console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
