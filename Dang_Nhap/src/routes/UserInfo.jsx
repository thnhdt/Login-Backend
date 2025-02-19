import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../App.css'

function User() {
  const [name, setName] = useState(null);
  const [address, setAddress] = useState(null);
  const [email, setEmail] = useState(null);
  const [phone_num, setPhoneNum] = useState(null);

  const [error, setError] = useState(null);

  const fetchInfo = async () => {
    try {
      const response = await fetch('/api/info');
      if (!response.ok) {
        throw new Error('Failed to fetch username');
      }
      const data = await response.json();
      setName(data.user.name);
      setAddress(data.user.address);
      setEmail(data.user.email);
      setPhoneNum(data.user.phone_num);
      console.log(data.user);
    } catch (err) {
      setError(err.message);
    }
  };

  fetchInfo()

  return (
    <>
        <div className="title-holder">
              <h1> Hello {name}</h1>
              <h2> Địa chỉ: {address}</h2>
              <h2> Email: {email}</h2>
              <h2> SĐT:  {phone_num}</h2>
        </div>
        {/* <Link to="/">
          <div className="login-box">
                <button> Sửa thông tin </button>
            </div>
        </Link> */}
    </>
  );
}

export default User;