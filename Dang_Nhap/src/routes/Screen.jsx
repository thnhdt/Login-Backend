import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../App.css'
import io from 'socket.io-client';

function Screen() {
  const [usermessage, setUsermessage] = useState(null);
  const [socketmessages, setSocketmessages] = useState([]);
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
  }, [username]); 

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
      <h1> Thông báo </h1>
        <div>
          <ul>
            {socketmessages.map((msg, index) => (
              <li key={index}>{msg}</li>
            ))}
          </ul>
        </div>
        <div>
          <Link to="/">
          <div className="login-box">
                <button> Về trang chủ </button>
            </div>
          </Link>
        </div>
    </>
  );
}

export default Screen;