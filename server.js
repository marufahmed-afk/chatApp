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

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`hello port ${PORT}`);
});
