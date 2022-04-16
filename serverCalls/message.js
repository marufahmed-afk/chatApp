const Room = require('../models/Room');

const saveMessage = async (message, groupId, userId) => {
  const roomFields = {};
  if (userId) roomFields.username = userId;
  if (message) roomFields.text = message;

  try {
    let room = await Room.findById(groupId);

    if (!room) console.log('room not found');

    room.messages = [...room.messages, roomFields];

    await room.save();
  } catch (err) {
    console.error(err.message);
  }
};

module.exports = { saveMessage };
