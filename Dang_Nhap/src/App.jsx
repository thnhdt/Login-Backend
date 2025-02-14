import { useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Main from './routes/Main'
import Login from './routes/Login';
import Register from './routes/Register';
import User from './routes/User';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <main>
      <Routes> 
        <Route path="/" element={<Main/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/user" element={<User/>}/>
      </Routes>
      </main>
    </div>
    </BrowserRouter>
  )
}

export default App



//nn phi cấu trúc -> no shemema//instance

//model control view -> tạo 1 model cho DB // instance n schemema -> tạo module? !!
//model và component


//NoSQL và SQL
//Routes -> not in
//hash password và encrypt decrypt