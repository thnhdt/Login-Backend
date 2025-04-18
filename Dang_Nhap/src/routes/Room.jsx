import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../App.css';
import io from 'socket.io-client';


function RoomContent({ roomId }) {
    const [content, setContent] = useState(null);
    const [socket, setSocket] = useState(null);
    const [error, setError] = useState(null);
    const [chat, setChat] = useState([]);

    const getSender = async () => {
        try {
            const response = await fetch(`/api/receive/${roomId}`);  
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

    useEffect(() => {
        const roomContents = {
            room1: 'This is the content for Room 1',
            room2: 'This is the content for Room 2',
            room3: 'This is the content for Room 3',
        };
        setContent(roomContents[roomId]);
        const newSocket = io("http://localhost:3000", { withCredentials: true });
        
        newSocket.emit('joinRoom', roomId); 
        newSocket.on("Rmessage", () => {
            getSender();
        });
        newSocket.on("receiveMessage", (messageContent) => {
            setChat((prevChat) => [...prevChat, messageContent]);
        });

        setSocket(newSocket);
        return () => {
            newSocket.disconnect();
        };
    }, [roomId]);

    if (!content) return <p>Loading...</p>;

    return (
        <div>
            <p>{content}</p>
        </div>
    );
}

const Room = () => {
    const { roomId } = useParams();
    const [message, setMessage] = useState(null);
    const [username, setUsername] = useState(null);
    const [error, setError] = useState(null);
    const [chat, setChat] = useState([]);

    const getSender = async () => {
        try {
            const response = await fetch(`/api/receive/${roomId}`);  
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
              body: JSON.stringify({ sender: username, room: roomId, message }),
            });
      
            if (!response.ok) {
              const errorData = await response.json();
              throw new Error(errorData.message);
            }
            console.log("Gửi tin nhắn thành công!");
          } catch (error) {
            console.error('Error during login:', error);
            setError('Gửi tin nhắn thất bại!'); 
          }
      }
  
    useEffect(() => {
        fetchUsername();
    }, []);

  return (
    <>
    <div>
      <h2>Welcome to {roomId}</h2>
      <RoomContent roomId={roomId} />
    </div>
    <h1> Thông báo </h1>
    <div>
      <input type="text" placeholder="Chat ở đây" onChange={(e) => setMessage(e.target.value)} /><br />
    </div>
    <div className="login-box">
      <button onClick={send}>
        Gửi
      </button>
    </div>
    <div>
      <ul>
        {chat.map((msg, index) => (
          <li key={index}>
            <strong>{msg.sender}</strong>: {msg.message}
            <small> ({new Date(msg.timestamp).toLocaleString()})</small>
          </li>
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
};

export default Room;