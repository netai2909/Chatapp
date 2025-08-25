import React, { useState, useEffect, useRef } from 'react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import UserList from './UserList';
import './Chat.css';

const Chat = ({ user, socket, isConnected, onLogout }) => {
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [typingUsers, setTypingUsers] = useState(new Set());
  const [showUserList, setShowUserList] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    // Socket event listeners
    socket.on('messages', (initialMessages) => {
      setMessages(initialMessages);
      setTimeout(scrollToBottom, 100);
    });

    socket.on('message', (newMessage) => {
      setMessages(prev => [...prev, newMessage]);
      setTimeout(scrollToBottom, 100);
    });

    socket.on('users', (userList) => {
      setUsers(userList);
    });

    socket.on('userJoined', (newUser) => {
      setUsers(prev => [...prev, newUser]);
    });

    socket.on('userLeft', (leftUser) => {
      setUsers(prev => prev.filter(u => u.id !== leftUser.id));
    });

    socket.on('userTyping', ({ username, isTyping }) => {
      setTypingUsers(prev => {
        const newSet = new Set(prev);
        if (isTyping) {
          newSet.add(username);
        } else {
          newSet.delete(username);
        }
        return newSet;
      });
    });

    return () => {
      socket.off('messages');
      socket.off('message');
      socket.off('users');
      socket.off('userJoined');
      socket.off('userLeft');
      socket.off('userTyping');
    };
  }, [socket]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (text) => {
    if (text.trim()) {
      socket.emit('message', { text: text.trim() });
    }
  };

  const handleTyping = (isTyping) => {
    socket.emit('typing', isTyping);
  };

  return (
    <div className="chat-container">
      {/* Header */}
      <header className="header">
        <h1>💬 ChatApp</h1>
        <div className="user-info">
          <img src={user.avatar} alt={user.username} className="avatar" />
          <span>{user.username}</span>
          <button onClick={onLogout} className="logout-btn">
            Logout
          </button>
        </div>
      </header>

      {/* Connection Status */}
      <div className={`connection-status ${isConnected ? 'connected' : 'disconnected'}`}>
        {isConnected ? '🟢 Connected' : '🔴 Disconnected'}
      </div>

      {/* Main Chat Area */}
      <div className="chat-main">
        {/* Messages Section */}
        <div className="messages-section">
          <MessageList 
            messages={messages} 
            currentUser={user}
            typingUsers={Array.from(typingUsers)}
            users={users}
          />
          <div ref={messagesEndRef} />
        </div>

        {/* User List Toggle */}
        <button 
          className="user-list-toggle"
          onClick={() => setShowUserList(!showUserList)}
        >
          👥 {users.length} Online
        </button>

        {/* User List Sidebar */}
        {showUserList && (
          <div className="user-list-sidebar">
            <UserList users={users} currentUser={user} />
          </div>
        )}
      </div>

      {/* Message Input */}
      <div className="message-input-container">
        <MessageInput 
          onSendMessage={handleSendMessage}
          onTyping={handleTyping}
          disabled={!isConnected}
        />
      </div>
    </div>
  );
};

export default Chat;
