const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  surname: {
    type: String
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  }
});

const menuSchema = new Schema({
  pizzaName: {
    type: String,
    required: true
  },
  ingridients: {
    type: [String],
    required: true
  },
  price:  {
    type: Number,
    required: true,
  }
})

const ordersSchema = new Schema({
  userId: {
    type: String
  },
  total:{
    type: Number,
    required: true
  },
  order: [{
    count: {
      type: Number
    },
    orderedPizza: {
      type: menuSchema
    }
  }],
  address: {
    type: String
  },
  email: {
    type: String
  }
})



module.exports = {
  userSchema: userSchema,
  ordersSchema: ordersSchema,
  menuSchema: menuSchema
}
