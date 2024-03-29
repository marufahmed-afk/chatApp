const express = require('express');
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const Room = require('../../models/Room');

const router = express.Router();

//Get all rooms for a User

router.get('/', auth, async (req, res) => {
  try {
    //we use user.id because JWT token object has id not _id like mongo which we do in the middleware "auth.js"
    const rooms = await Room.find({
      users: req.user.id,
    });
    res.json(rooms);
  } catch (err) {
    console.error(err.room);
    res.status(500).send('Server Error');
  }
});

//Get all messages from a room

router.get('/:id', auth, async (req, res) => {
  try {
    let room = await Room.findById(req.params.id);

    if (!room) return res.status(404).json({ msg: 'Room not found' });

    res.json(room.messages);
  } catch (err) {
    console.error(er.message);
    res.status(500).send('Server Error');
  }
});

//Creating a new Room

router.post('/', auth, async (req, res) => {
  const { name, users, messages } = req.body;

  const roomFields = {};
  if (name) roomFields.name = name;
  if (users) roomFields.users = users;
  if (messages) roomFields.messages = messages;

  try {
    let foundRoom = await Room.findOne({ name });
    if (foundRoom) {
      if (foundRoom.users.indexOf(req.user.id) === -1) {
        // room = await foundRoom.update(
        //   { $set: { users: [...users, req.user.id] } },
        //   { upsert: true }
        // );

        const { users } = foundRoom;

        users.push(req.user.id);

        const room = await foundRoom.save();

        res.json(room);
      }
      return res.status(400).json({ msg: 'Room already exists' });
    }

    const newRoom = new Room({
      name,
      users: [...users, req.user.id],
      messages,
      owner: req.user.id,
    });

    const room = await newRoom.save();
    res.json(room);
  } catch (err) {
    res.status(500).send('Server Error', err);
  }
});

//Updating a Room to add new messages

router.put('/:id', auth, async (req, res) => {
  const { username, text } = req.body;

  const roomFields = {};
  if (username) roomFields.username = username;
  if (text) roomFields.text = text;

  try {
    let room = await Room.findById(req.params.id);

    if (!room) return res.status(404).json({ msg: 'Room not found' });

    room.messages = [...room.messages, roomFields];

    room.save();

    res.json(room);
  } catch (err) {
    console.error(er.message);
    res.status(500).send('Server Error');
  }
});

//@route    Delete api/media/comics
//@desc     Delete specified comic
//@access   Private

router.delete('/:id', (req, res) => {
  res.send('Delete comic');
});

module.exports = router;
