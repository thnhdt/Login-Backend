import { useState } from 'react';
import '../App.css'
import { Link } from 'react-router-dom';



function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleRegister = async () => {
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Registration failed');
      }

      alert("Đăng ký thành công!");
    } catch (error) {
      console.error('Error during registration:', error);
      alert("Đăng ký thất bại!");
      setErrorMessage('Registration failed. Please try again.'); 
    }
  };

  return (
    <>
     <h1>Register</h1>
      <div>
        <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} /><br />
        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      </div>
      <div className="login-box">
        <button onClick={handleRegister}>
          Register
        </button>
      </div>
      <Link to="/login">
      <div className="login-box">
        <button>
          Back to Login
        </button>
      </div>
      </Link>
    </>
  );
}

export default Register; 