import React from 'react';
import './MessageList.css';

const MessageList = ({ messages, currentUser, typingUsers, users = [] }) => {
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const isOwnMessage = (message) => {
    return message.userId === currentUser.id;
  };

  return (
    <div className="message-list">
      {messages.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">💬</div>
          <h3>Welcome to the chat!</h3>
          <p>Start the conversation by sending a message below.</p>
        </div>
      ) : (
        messages.map((message) => (
          <div
            key={message.id}
            className={`message ${isOwnMessage(message) ? 'own-message' : 'other-message'} fade-in`}
          >
            <div className="message-content">
              {!isOwnMessage(message) && (
                <div className="message-header">
                  <img 
                    src={message.avatar} 
                    alt={message.username} 
                    className="message-avatar"
                  />
                  <span className="message-username">{message.username}</span>
                </div>
              )}
              
              <div className="message-bubble">
                <p className="message-text">{message.text}</p>
                <span className="message-time">
                  {formatTime(message.timestamp)}
                </span>
              </div>
            </div>
          </div>
        ))
      )}
      
      {/* Typing indicators */}
      {typingUsers.length > 0 && (
        <div className="typing-indicators">
          {typingUsers.map((username, index) => (
            <div key={index} className="typing-indicator fade-in">
              <div className="typing-avatar">
                {users.find(u => u.username === username)?.avatar && (
                  <img 
                    src={users.find(u => u.username === username).avatar} 
                    alt={username} 
                  />
                )}
              </div>
              <div className="typing-bubble">
                <span className="typing-text">{username} is typing</span>
                <div className="typing-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MessageList;
