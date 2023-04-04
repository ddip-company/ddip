import { useNavigate } from "react-router-dom";
import { AuthContext } from "../store/auth-context";
import { useContext } from "react";

function LogoutButton() {
  const navigate = useNavigate();
  const authActions = useContext(AuthContext);
  const logout = () => {
    authActions.logoutHandler();
    return navigate("/");
  };

  return <button onClick={logout}>Logout</button>;
}

export default LogoutButton;
