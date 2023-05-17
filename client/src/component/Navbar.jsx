import { Link } from "react-router-dom";
import LogoutButton from "./LogoutButton";
import "./Navbar.css";
import { useContext } from "react";
import { AuthContext } from "../store/auth-context";

// useContext는 전역으로 관리하는 데이터를 받아올 수 있게 하는 함수

const Navbar = () => {
  const { isLoggined, userInfo } = useContext(AuthContext);

  return (
    <div className="nav-container">
      <div className="nav-containerLeft">
        <img
          src={process.env.PUBLIC_URL + "/img/logo192.png"}
          alt="logo img"
          width="100px"
          height="21px"
        />

        <div className="nav-searchBar">
          <img
            className="searchImg"
            src={process.env.PUBLIC_URL + "/img/search.png"}
            alt="search img"
          />
          <input
            className="nav-input"
            placeholder="어떤 번개를 찾으시나요?"
          ></input>
        </div>
      </div>
      <div className="nav-containerRight">
        <div className="nav-btn">
          <Link to="/">
            <div className="nav-btn-text">번개목록</div>
          </Link>
          {!isLoggined ? null : (
            <Link to="/signup">
              <div className="nav-btn-text">번개만들기</div>
            </Link>
          )}
          {!isLoggined ? null : (
            <Link to={`/mypage/${userInfo.nickname}`}>
              <span className="nav-btn-text">마이페이지</span>
            </Link>
          )}
          {!isLoggined ? (
            <Link to="/login">
              <div className="nav-btn-text">로그인</div>
            </Link>
          ) : (
            <LogoutButton />
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
