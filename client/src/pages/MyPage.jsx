import { AuthContext } from "../store/auth-context";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../component/Navbar";

function Mypage() {
  const { userInfo } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <h1>프로필</h1>
      <div>
        <p>
          <strong>[ email ]</strong> {userInfo.email}
        </p>
        <p>
          <strong>[ nickname ]</strong> {userInfo.nickname}
        </p>
      </div>
      <div>
        <button onClick={() => navigate("/withdraw")}>회원 탈퇴</button>
      </div>
    </>
  );
}

export default Mypage;
