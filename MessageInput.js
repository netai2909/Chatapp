import React, { useState, useEffect, useRef } from 'react';
import './MessageInput.css';

const MessageInput = ({ onSendMessage, onTyping, disabled }) => {
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const typingTimeoutRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    // Focus input when component mounts
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    // Clear typing timeout on cleanup
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setMessage(value);

    // Handle typing indicator
    if (!isTyping && value.length > 0) {
      setIsTyping(true);
      onTyping(true);
    }

    // Clear typing indicator after 1 second of no input
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false);
      onTyping(false);
    }, 1000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message);
      setMessage('');
      setIsTyping(false);
      onTyping(false);
      
      // Clear typing timeout
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
      
      // Focus input after sending
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="message-input-form">
      <div className="input-wrapper">
        <input
          ref={inputRef}
          type="text"
          value={message}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder={disabled ? "Connecting..." : "Type your message..."}
          disabled={disabled}
          className="message-input"
          maxLength={500}
        />
        <button
          type="submit"
          disabled={!message.trim() || disabled}
          className="send-button"
        >
          <svg 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22,2 15,22 11,13 2,9"></polygon>
          </svg>
        </button>
      </div>
      
      {message.length > 0 && (
        <div className="message-length">
          {message.length}/500
        </div>
      )}
    </form>
  );
};

export default MessageInput;
