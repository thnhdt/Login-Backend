import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../App.css'

function User() {
  const [username, setUsername] = useState(null);
  const [error, setError] = useState(null);

  const fetchUsername = async () => {
    try {
      const response = await fetch('http://localhost:3000/info');
      if (!response.ok) {
        throw new Error('Failed to fetch username');
      }
      const data = await response.json();
      setUsername(data.name);
    } catch (err) {
      setError(err.message);
    }
  };

  fetchUsername();

  return (
    <>
      <h1>Xin Chào</h1>
        <div>
          <Link to="/">
          <div className="login-box">
                <button> Về trang chủ </button>
                {username && <h1>{username}</h1>}

            </div>
          </Link>
        </div>
        <div className="title-holder">
              {username && <h1>{username}</h1>}
        </div>
    </>
  );
}

export default User;