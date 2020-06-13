const express = require("express");
const connectDB = require("./config/db");

const app = express();

//Connecting to the database
connectDB();

//Init Middleware
app.use(express.json({ extended: false }));

//Define routes
app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/chat", require("./routes/chat/chat"));
app.use("/api/room", require("./routes/room/room"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`hello port ${PORT}`);
});
