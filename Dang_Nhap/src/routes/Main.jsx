 
import { Link } from 'react-router-dom';
import '../App.css'

function Main() {
  return (
    <>
      <h1>Đăng nhập/ Đăng kí</h1>
        <div>
          <Link to="/login">
          <div className="login-box">
                <button> Login </button>
            </div>
          </Link>
          <Link to="/register">
            <div className="login-box">
                <button> Register </button>
            </div>
          </Link>
        </div>
    </>
  );
}

export default Main;