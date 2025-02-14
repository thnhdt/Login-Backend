
import { Link } from 'react-router-dom';
import '../App.css'

function User() {
  return (
    <>
      <h1>Xin Chào</h1>
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

export default User;