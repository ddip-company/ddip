import { Link } from "react-router-dom";
import LogoutButton from "./LogoutButton";
import "./Navbar.css";
import { useContext } from "react";
import { AuthContext } from "../store/auth-context";

// useContext는 전역으로 관리하는 데이터를 받아올 수 있게 하는 함수

const Navbar = () => {
  const { isLoggined, userInfo } = useContext(AuthContext);

  return (
    <div className="Navbar">
      <Link className="NavLink" to="/">
        <span className="NavLink span">메인페이지</span>
      </Link>
      {!isLoggined ? (
        <Link className="NavLink" to="/login">
          <span className="NavLink span">로그인</span>
        </Link>
      ) : (
        <LogoutButton />
      )}
      {!isLoggined ? (
        <Link className="NavLink" to="/signup">
          <span className="NavLink span">회원가입</span>
        </Link>
      ) : (
        <Link className="NavLink" to={`/mypage/${userInfo.nickname}`}>
          <span className="NavLink span">마이페이지</span>
        </Link>
      )}
    </div>
  );
};

export default Navbar;
