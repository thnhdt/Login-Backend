import { useState } from 'react';
import '../App.css'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
      }
      alert("Login thành công!");
      navigate('/user');
      
    } catch (error) {
      console.error('Error during login:', error);
      alert("Login thất bại!");
      setErrorMessage('Incorrect username or password. Try again.'); 
    }
  };

  return (
    <>
      <h1>Login</h1>
      <div>
        <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} /><br />
        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      </div>
      <div className="login-box">
        <button onClick={handleSubmit}>
          Login
        </button>
      </div>
      <Link to="/register">
      <div className="login-box">
        <button>
            Back to Register
        </button>
      </div>
      </Link>
    </>
  );
}

export default Login;