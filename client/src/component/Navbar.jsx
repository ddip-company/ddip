import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <div className="Navbar">
      <Link className="NavLink" to="/">
        <span className="NavLink span">메인페이지</span>
      </Link>
      <Link className="NavLink" to="/login">
        <span className="NavLink span">로그인</span>
      </Link>
      <Link className="NavLink" to="/signUp">
        <span className="NavLink span">회원가입</span>
      </Link>
    </div>
  );
};

export default Navbar;
