const express = require("express");
const auth = require("../../middleware/auth");
const User = require("../../models/User");
const Room = require("../../models/Room");

const router = express.Router();

//Get all rooms for a User

router.get("/", auth, async (req, res) => {
  try {
    //we use user.id because JWT token object has id not _id like mongo which we do in the middleware "auth.js"
    const rooms = await Room.find({
      users: req.user.id,
    });
    res.json(rooms);
  } catch (err) {
    console.error(err.room);
    res.status(500).send("Server Error");
  }
});

//Creating a new Room

router.post("/", auth, async (req, res) => {
  const { name, users, messages } = req.body;

  try {
    const newRoom = new Room({
      name,
      users,
      messages,
      owner: req.user.id,
    });

    const room = await newRoom.save();
    res.json(room);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//Updating a Room to add new messages

router.put("/:id", auth, async (req, res) => {
  const { name, users, messages } = req.body;

  const roomFields = {};
  if (name) roomFields.name = name;
  if (users) roomFields.users = users;
  if (messages) roomFields.messages = messages;

  try {
    let room = await Room.findById(req.params.id);

    if (!room) return res.status(404).json({ msg: "Room not found" });

    room = await Room.findByIdAndUpdate(
      req.params.id,
      { $set: roomFields },
      { new: true }
    );

    res.json(room);
  } catch (err) {
    console.error(er.message);
    res.status(500).send("Server Error");
  }
});

//@route    Delete api/media/comics
//@desc     Delete specified comic
//@access   Private

router.delete("/:id", (req, res) => {
  res.send("Delete comic");
});

module.exports = router;
