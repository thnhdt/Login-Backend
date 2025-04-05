import { useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter, Routes, Route, useLocation} from 'react-router-dom';
// import { LoginHeader, AppHeader } from './components/Header';
// import AppFooter from './components/Footer';

import Main from './routes/Main'
import Login from './routes/Login';
import Register from './routes/Register';
import User from './routes/User';
import UserInfo from './routes/UserInfo';
import NotFound from './routes/NotFound';
import Screen from './routes/Screen';
import Chat from './routes/Chat';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      {/* <header id="header">
       <HeaderSwitcher/>
      </header> */}
      <main>
      <Routes> 
        <Route path="/" element={<Main/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/user" element={<User/>}/>
        <Route path="/userInfo" element={<UserInfo/>}/>
        <Route path="/screen" element={<Screen />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      </main>
      {/* <footer id="footer">
        <AppFooter/>
      </footer> */}
    </div>
    </BrowserRouter>
  )
}

// function HeaderSwitcher() {
//   const location = useLocation(); 
//   if(location.pathname === "/user"){
//     return <LoginHeader/>;
//   }
//   return <AppHeader/>;
// }


export default App

