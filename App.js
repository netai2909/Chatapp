import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import Login from './components/Login';
import Chat from './components/Chat';
import './App.css';

const socket = io(process.env.REACT_APP_SOCKET_URL || 'http://localhost:5000');

function App() {
  const [user, setUser] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Check if user is already logged in
    const savedUser = localStorage.getItem('chatUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }

    // Socket connection events
    socket.on('connect', () => {
      setIsConnected(true);
      console.log('Connected to server');
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
      console.log('Disconnected from server');
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
    };
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('chatUser', JSON.stringify(userData));
    socket.emit('join', userData);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('chatUser');
    socket.disconnect();
    socket.connect();
  };

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="App">
      <Chat 
        user={user} 
        socket={socket} 
        isConnected={isConnected}
        onLogout={handleLogout}
      />
    </div>
  );
}

export default App;
