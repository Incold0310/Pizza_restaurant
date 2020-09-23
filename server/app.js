const express = require("express");
const app = express();
const cors = require("cors");

const bodyParser = require("body-parser");
const environment = require('./environment');
const auth = require('./auth');
const menu = require('./getMenu');
const order = require('./order');


app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use('/signin', (req, res) => {
  auth.signIn(req, res);
})

app.use('/signup', (req, res) => {
  auth.signUp(req, res);
})

app.use('/getmenu', (req, res) => {
  menu.getMenu(res);
})

app.use('/add_order', (req, res) => {
  order.addOrder(req, res)
})

app.use('/get_orders', (req, res) => {
  order.getUserOrders(req, res)
})

console.log('Server is running!');

app.listen(environment.port);
