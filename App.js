import { Routes, Route, Link, useNavigate } from "react-router-dom";
import './App.css';
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import SignUp from "./pages/SignupPage";
// import React from 'react';

function App() {
  return (      
    <div className="App">
      <Routes>
        <Route path="/" element={<MainPage/>}></Route>
        <Route path="/signUp" element={<SignUp/>}></Route>
        <Route path="/login" element={<LoginPage/>}></Route>
      </Routes>
    </div>
    
  );
}


export default App;
