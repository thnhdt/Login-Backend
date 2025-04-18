import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../App.css';
import io from 'socket.io-client';

const Room = () => {
    const { roomId } = useParams();
    const [content, setContent] = useState(null);
    const [socket, setSocket] = useState(null);
    const [error, setError] = useState(null);
    const [chat, setChat] = useState([]);
    const [message, setMessage] = useState("");
    const [username, setUsername] = useState(null);

    const apiRequest = async (url, method = 'GET', body = null) => {
        try {
            const options = {
                method,
                headers: { 'Content-Type': 'application/json' },
            };
            if (body) options.body = JSON.stringify(body);
            const response = await fetch(url, options);
            if (!response.ok) throw new Error((await response.json()).message);
            return await response.json();
        } catch (err) {
            setError(err.message);
            console.error('API request error:', err);
            return null;
        }
    };

    const fetchUsername = async () => {
        const data = await apiRequest('/api/info');
        if (data) setUsername(data.user.username);
    };

    const send = async () => {
        if (!message.trim()) return;
        const body = {
            sender: username,
            room: roomId,
            message,
            socketID: socket.id,
        };
        const data = await apiRequest('/api/send', 'POST', body);
        if (data) {
            setMessage("");
            console.log("Gửi tin nhắn thành công!");
        } else {
            setError('Gửi tin nhắn thất bại!');
        }
    };

    const getSender = async () => {
        const data = await apiRequest(`/api/receive/${roomId}`);
        if (data) setChat(data.messages || []);
    };

    useEffect(() => {
        const roomContents = {
            room1: 'Thông tin cho Room 1',
            room2: 'Thông tin cho Room 2',
            room3: 'Thông tin cho Room 3',
        };
        setContent(roomContents[roomId]);
        getSender()
        const newSocket = io("http://localhost:3000", { withCredentials: true });

        newSocket.emit('joinRoom', roomId);
        newSocket.on("Rmessage", getSender);
        newSocket.on("receiveMessage", (messageContent) => {
          setChat((prev) => [...prev, messageContent]);
          getSender();
      });

        setSocket(newSocket);
        return () => newSocket.disconnect();
    }, [roomId]);

    useEffect(() => {
        fetchUsername();
    }, []);

    if (!content) return <p>Loading...</p>;

    return (
        <>
            <div>
                <h2>Welcome to {roomId}</h2>
                <p>{content}</p>
            </div>
            <h1> Thông báo </h1>
            <div>
                <input
                    type="text"
                    placeholder="Chat ở đây"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                /><br />
            </div>
            <div className="login-box">
                <button onClick={send}>Gửi</button>
            </div>
            <div className="chat-container">
                <ul className="chat-list">
                    {chat.map((msg, index) => (
                        <li key={index} className="chat-message">
                            <strong>{msg.sender}</strong>: {msg.message}
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