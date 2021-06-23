const express = require('express');
const connectDB = require('./config/db');
const socketio = require('socket.io');
const http = require('http');
const cors = require('cors');

const router = require('./router');

const app = express();
const server = http.Server(app);
const io = socketio(server);

const User = require('./models/User');

//Connecting to the database
connectDB();

//Init Middleware
app.use(express.json({ extended: false }));
app.use(cors());
//app.use(router);

//Define routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/chat', require('./routes/chat/chat'));
app.use('/api/room', require('./routes/room/room'));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  );
}

io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('join', ({ username, name }) => {
    console.log('Client', username, name);
  });
  socket.on('sendMessage', (message, id, callback) => {
    const user = User.findById(id).then(() => {
      // fix promises
      console.log('success');
      console.log('user : ', user, message);
      io.to(user.name).emit('message', { user: user.username, text: message });
      console.log('message sent');
      callback();
    });
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`hello port ${PORT}`);
});

module.exports = router;
