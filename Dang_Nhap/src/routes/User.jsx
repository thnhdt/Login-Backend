import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../App.css'
import io from 'socket.io-client';


function User() {
  const [usermessage, setUsermessage] = useState(null);
  const [username, setUsername] = useState(null);
  const [error, setError] = useState(null);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io("http://localhost:3000", { withCredentials: true });
    
    newSocket.on("connect", () => {
      console.log("Connected:", newSocket.id);
    });

    newSocket.on("message", (msg) => {
      setSocketmessages(prevMessages => [...prevMessages, msg]);
      console.log("Received:", msg);
    });

    setSocket(newSocket);
    return () => {
      newSocket.disconnect();
    };
  }, []); 

  function send() {
    if (socket) {
      const messageToSend = `From ${username}: ${usermessage}`;
      socket.emit("message", messageToSend);
    }
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

  fetchUsername();

  return (
    <>
      <h1>Xin Chào {username} </h1>
        <div>
          <Link to="/Screen">
          <div className="login-box">
                <button> Thông báo chung </button>
            </div>
          </Link>
          <Link to="/userInfo">
            <div className="login-box">
                <button> Thông tin </button>
            </div>
          </Link>
          <Link to="/chat">
          <div className="login-box">
                <button> Chat </button>
            </div>
          </Link>
          <Link to="/">
          <div className="login-box">
                <button> Về trang chủ </button>
            </div>
          </Link>
        </div>
        <div>
          <input type="text" placeholder="Thông báo ở đây" onChange={(e) => setUsermessage(e.target.value)} /><br />
        </div>
        <div className="login-box">
          <button onClick={send}>
            Gửi
          </button>
        </div>
    </>
  );
}

export default User;