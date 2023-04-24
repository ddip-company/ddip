import { Routes, Route } from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import MyPage from "./pages/MyPage";
import SignUp from "./pages/SignupPage";
import WithDraw from "./pages/WithDraw";
// import React from 'react';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<MainPage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/mypage/:nickname" element={<MyPage />}></Route>
        <Route path="/withdraw" element={<WithDraw />}></Route>
      </Routes>
    </div>
  );
}

export default App;
