import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../store/auth-context";
import { useContext } from "react";

function LogoutButton() {
  const navigate = useNavigate();
  const authActions = useContext(AuthContext);
  const logout = () => {
    authActions.logoutHandler();
    return navigate("/");
  };

  return (
    <div className="nav-btn-text" onClick={logout}>
      로그아웃
    </div>
  );
}

export default LogoutButton;
