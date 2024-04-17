// utils/realtime.js
const { EventEmitter } = require('events');
const { Server } = require('socket.io');

const eventEmitter = new EventEmitter();

exports.initializeRealtime = (app) => {
  const io = new Server(app.listen(3001, () => {
    console.log('Real-time server running on port 3001');
  }));

  io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('disconnect', () => {
      console.log('A user disconnected');
    });

    // Handle real-time events here
    eventEmitter.on('post_created', (post) => {
      socket.emit('new_post', post);
    });
  });
};

exports.emitPostCreated = (post) => {
  eventEmitter.emit('post_created', post);
};