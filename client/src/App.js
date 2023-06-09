import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import MyPage from "./pages/MyPage";
import SignUp from "./pages/SignupPage";
import VerificationPage from "./pages/VerificationPage";
import Withdraw from "./pages/Withdraw";
import SearchPage from "./pages/SearchPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />}></Route>
      <Route path="/login" element={<LoginPage />}></Route>
      <Route path="/signup" element={<SignUp />}></Route>
      <Route path="/mypage/:nickname" element={<MyPage />}></Route>
      <Route path="/withdraw" element={<Withdraw />}></Route>
      <Route path="/email-auth" element={<VerificationPage />}></Route>
      <Route path="/bungae-search" element={<SearchPage />}></Route>
    </Routes>
  );
}

export default App;
