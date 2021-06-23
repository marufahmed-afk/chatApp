const mongoose = require('mongoose');

const RoomSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  },
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
    },
  ],
  messages: [
    {
      username: '',
      text: '',
      date: { type: Date, default: Date.now },
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('room', RoomSchema);
