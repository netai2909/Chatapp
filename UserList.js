import React from 'react';
import './UserList.css';

const UserList = ({ users, currentUser }) => {
  const formatUserCount = (count) => {
    if (count === 1) return '1 person online';
    return `${count} people online`;
  };

  return (
    <div className="user-list">
      <div className="user-list-header">
        <h3>👥 Online Users</h3>
        <span className="user-count">{formatUserCount(users.length)}</span>
      </div>
      
      <div className="users-container">
        {users.length === 0 ? (
          <div className="no-users">
            <span className="no-users-icon">👤</span>
            <p>No users online</p>
          </div>
        ) : (
          users.map((user) => (
            <div 
              key={user.id} 
              className={`user-item ${user.id === currentUser.id ? 'current-user' : ''}`}
            >
              <div className="user-avatar">
                <img src={user.avatar} alt={user.username} />
                <div className="online-indicator"></div>
              </div>
              
              <div className="user-info">
                <span className="username">
                  {user.username}
                  {user.id === currentUser.id && <span className="you-badge"> (You)</span>}
                </span>
                <span className="user-status">Online</span>
              </div>
            </div>
          ))
        )}
      </div>
      
      <div className="user-list-footer">
        <p>💡 Tip: Click on a user to see their profile</p>
      </div>
    </div>
  );
};

export default UserList;
