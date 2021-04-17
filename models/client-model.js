const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  register_number: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  telephone: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  website: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
});


module.exports = mongoose.model("Client", clientSchema);
