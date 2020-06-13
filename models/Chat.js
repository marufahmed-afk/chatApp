const mongoose = require("mongoose");

const ChatSchema = mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  // room: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "rooms",
  // },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("chat", ChatSchema);
