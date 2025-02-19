import { useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter, Routes, Route, useLocation} from 'react-router-dom';
import { LoginHeader, AppHeader } from './components/Header';
import AppFooter from './components/Footer';

import Main from './routes/Main'
import Login from './routes/Login';
import Register from './routes/Register';
import User from './routes/User';
import UserInfo from './routes/UserInfo';
import NotFound from './routes/NotFound';

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

//nn phi cấu trúc -> no shemema//instance

//model control view -> tạo 1 model cho DB // instance n schemema -> tạo module? !!
//model và component

//vite config vite + eslint
//config js



//Tạm:
//socket io redis client
//new: proxy
// tránh cors + ẩn IP thực
//   /api->local
// 
// 
// new:/ alias cho đường dẫn// tách vendor
//
// 
// //
// cookie n session 
// cookie: nhỏ, nhớ trạng thái đăng nhập, giỏ hàng, hành vi ....
// -> trên trình duyệt -> dc lưu, cài tgian đóng
// lưu lâu dài: trạng thái đăng nhập, theme, lang=, username...
// session: 
// -> trên server -> hết hạn khi đóng web//
//
// hash password và encrypt decrypt 
// hash -> băm -> 1 chiều
// cùng 1 input cho 1 output
// 
// encrypt -> 2 chiều mã hóa -> có khóa -> bảo mật để đem đi
// 
// encoding -> chiểu dữ liệu cho nhẹ -> đem đi//
// //
//
// load balancing
// Server load balancing -> chia tải server
// ->   layer 7 load balancing
// Network laod balancing -> chia tải ip ????
// -> layer 4 transport balancing//
//redis luồn
// 
// /redis session save -> lưu trên RAM redis -> nhanh hơn
// Nguyên nhân chính: Khi dùng Redis làm session store,
// dữ liệu session được lưu trên server, 
// nên không cần chờ Redis ghi vào client như khi dùng cookie.

//
// const app = express();
// const httpServer = createServer(app);
// const redisStore = new RedisStore({
//   client,
//   prefix: 'login-app:'
// });
// =>>> ? lúc mà bị lỗi not a constructor -> maybe thiếu {} trong hàm
//


//config
// goi. app.database.redis ....
//stm?
////NoSQL và SQL và Key-Value, giao dịch ACID

//axios

