const mongoose = require("mongoose");
var validator = require('validator');
const UserSchema = new mongoose.Schema({
  first_name: {
    type: String,
  },
  last_name: {
    type: String,
  },
  phone_no: {
    type: Number,
  },
  address: {
    street: {
      type: String,
    },
    city: {
      type: String,
    },
    state: {
      type: String,
    },
    country: {
      type: String,
    }
  },
  login_id: {
    type: String,
    required: true,

  },
  password: {
    type: String,
    required: true,
  }
})


const UserData = new mongoose.model("UserData", UserSchema);  //collection 
module.exports = UserData;  