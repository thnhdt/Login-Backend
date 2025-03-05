import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import io from 'socket.io-client';

function Chat() {
  const [message, setMessage] = useState(null);
  const [username, setUsername] = useState(null);
  const [receiver, setReceiver] = useState(null);
  const [senders, setSenders] = useState([]);
  const [chat, setChat] = useState([]);
  const [socket, setSocket] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const newSocket = io("http://localhost:3000", { withCredentials: true });

    newSocket.on("Rmessage", () => {
        getSender();
        console.log("Received message from server");
    });

    setSocket(newSocket);
    return () => {
      newSocket.disconnect();
    };
  }, []); 

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

  const send = async () =>{
    try {
        const response = await fetch('/api/send', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ sender: username, receiver, message }),
        });
  
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message);
        }
        console.log("Gửi tin nhắn thành công!");
        getSender();
      } catch (error) {
        console.error('Error during login:', error);
        setError('Gửi tin nhắn thất bại!'); 
      }
  }

  const getSender = async () => {
    await fetchUsername();
    try {
        const response = await fetch(`/api/receive/${username}/${senders}`);  
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message);
        }
        const data = await response.json();
        const messages = data.messages || [];
        setChat(messages);
      } catch (error) {
        console.error('Error fetching messages:', error);
        setError('Failed to fetch messages!');
      }
  }

  fetchUsername();

  return (
    <>
      <h1> Thông báo </h1>
        <div>
          <input type="text" placeholder="Chat ở đây" onChange={(e) => setMessage(e.target.value)} /><br />
          <input type="text" placeholder="Người nhận" onChange={(e) => setReceiver(e.target.value)} /><br />
        </div>
        <div className="login-box">
          <button onClick={send}>
            Gửi
          </button>
        </div>
        <div>
          {/* <input type="text" placeholder="Xem tin nhắn từ" onChange={(e) => setSenders(e.target.value)} /><br /> */}
          <ul>
            {chat.map((msg, index) => (
              <li key={index}>
                <strong>{msg.sender}</strong>: {msg.message}
                <small> ({new Date(msg.timestamp).toLocaleString()})</small>
              </li>
            ))}
          </ul>
        </div>
        {/* <div className="login-box">
          <button onClick={getSender}>
            Xem
          </button>
        </div> */}
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

export default Chat;