import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../App.css'
import io from 'socket.io-client';


function User() {
  const [username, setUsername] = useState(null);
  return (
    <>
      <h1>Xin Chào {username} </h1>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
          <Link to="/room/room1">
            <div className="login-box">
                <button>Room 1</button>
            </div>
          </Link>
          <Link to="/room/room2">
            <div className="login-box">
                <button>Room 2</button>
            </div>
          </Link>
          <Link to="/room/room3">
            <div className="login-box">
                <button>Room 3</button>
            </div>
          </Link>
        </div>
        <div>
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
          <Link to="/user">
            <div className="login-box">
                <button> Về trang chủ </button>
            </div>
          </Link>
        </div>
    </>
  );
}

export default User;