const express = require('express');
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const Chat = require('../../models/Chat');

const router = express.Router();

//Get user messages

router.get('/', auth, async (req, res) => {
  try {
    //we use user.id because JWT token object has id not _id like mongo which we do in the middleware "auth.js"
    const messages = await Chat.find({ user: req.user.id }).sort({ date: -1 });
    res.json(messages);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//Add new message

router.post('/', auth, async (req, res) => {
  const { text } = req.body;

  try {
    const newChat = new Chat({
      text,
      // room,
      user: req.user.id,
    });

    const chat = await newChat.save();
    res.json(chat);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
