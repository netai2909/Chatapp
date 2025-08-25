import React, { useState } from 'react';
import './Login.css';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) {
      setIsLoading(true);
      // Simulate a small delay for better UX
      setTimeout(() => {
        onLogin({
          username: username.trim(),
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${username.trim()}`
        });
        setIsLoading(false);
      }, 500);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>Welcome to ChatApp</h1>
          <p>Join the conversation with people around the world</p>
        </div>
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <label htmlFor="username">Choose your username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username..."
              required
              minLength={2}
              maxLength={20}
              disabled={isLoading}
            />
          </div>
          
          <button 
            type="submit" 
            className="login-btn"
            disabled={!username.trim() || isLoading}
          >
            {isLoading ? 'Joining...' : 'Join Chat'}
          </button>
        </form>
        
        <div className="login-features">
          <div className="feature">
            <span className="feature-icon">💬</span>
            <span>Real-time messaging</span>
          </div>
          <div className="feature">
            <span className="feature-icon">👥</span>
            <span>See who's online</span>
          </div>
          <div className="feature">
            <span className="feature-icon">⚡</span>
            <span>Instant notifications</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
