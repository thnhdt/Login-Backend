import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../App.css'
import io from 'socket.io-client';

function User() {
  const [usermessage, setUsermessage] = useState(null);
  const [username, setUsername] = useState(null);
  const [error, setError] = useState(null);
  const socket = io('/api', { withCredentials: true });

  socket.on("connect", () => {
      console.log("Connected:", socket.id);
  });

  socket.on("message", (msg) => {
      console.log("Received:", msg);
  });

  function send() {
      socket.emit("message", "Hello from Browser!");
      console.log("here");
  }


  const fetchUsername = async () => {
    try {
      const response = await fetch('/api/info');
      if (!response.ok) {
        throw new Error('Failed to fetch username');
      }
      const data = await response.json();
      setUsername(data.user.username);
      console.log(data.user);
    } catch (err) {
      setError(err.message);
    }
  };

  const sendMessage = async () =>{
    try{
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ usermessage }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Không thể gửi');
      }
      console.log("gửi message:", usermessage);
    } catch (err){
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
            </div>
          </Link>
        </div>
        <div>
          <Link to="/userInfo">
            <div className="login-box">
                <button> Thông tin </button>
            </div>
          </Link>
        </div>
        <div>
          <input type="text" placeholder="Chat ở đây" onChange={(e) => setUsermessage(e.target.value)} /><br />
        </div>
        <div className="login-box">
          <button onClick={send}>
            Gửi
          </button>
        </div>
        <div className="title-holder">
              <h1> Hello {username}</h1>
        </div>
    </>
  );
}

export default User;