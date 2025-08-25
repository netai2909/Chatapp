const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: [
      "http://localhost:3000",
      process.env.CORS_ORIGIN || "https://*.vercel.app"
    ],
    methods: ["GET", "POST"]
  }
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../client/build')));

// Store connected users
const users = new Map();
const messages = [];

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // Handle user joining
  socket.on('join', (userData) => {
    users.set(socket.id, {
      id: socket.id,
      username: userData.username,
      avatar: userData.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${userData.username}`
    });
    
    // Send current users list to all clients
    io.emit('users', Array.from(users.values()));
    
    // Send recent messages to new user
    socket.emit('messages', messages.slice(-50));
    
    // Notify others about new user
    socket.broadcast.emit('userJoined', users.get(socket.id));
    
    console.log(`${userData.username} joined the chat`);
  });

  // Handle new message
  socket.on('message', (messageData) => {
    const user = users.get(socket.id);
    if (user) {
      const message = {
        id: Date.now() + Math.random(),
        text: messageData.text,
        username: user.username,
        avatar: user.avatar,
        timestamp: new Date().toISOString(),
        userId: socket.id
      };
      
      messages.push(message);
      
      // Keep only last 100 messages
      if (messages.length > 100) {
        messages.shift();
      }
      
      // Broadcast message to all clients
      io.emit('message', message);
    }
  });

  // Handle typing indicator
  socket.on('typing', (isTyping) => {
    const user = users.get(socket.id);
    if (user) {
      socket.broadcast.emit('userTyping', {
        username: user.username,
        isTyping
      });
    }
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    const user = users.get(socket.id);
    if (user) {
      users.delete(socket.id);
      io.emit('users', Array.from(users.values()));
      io.emit('userLeft', user);
      console.log(`${user.username} left the chat`);
    }
  });
});

// API routes
app.get('/api/users', (req, res) => {
  res.json(Array.from(users.values()));
});

app.get('/api/messages', (req, res) => {
  res.json(messages);
});

// Serve React app for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Chat app is ready! Open http://localhost:${PORT}`);
});
