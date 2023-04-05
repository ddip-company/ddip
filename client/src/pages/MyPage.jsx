import { AuthContext } from "../store/auth-context";
import { useContext } from "react";

function Mypage() {
  const { userInfo } = useContext(AuthContext);

  return (
    <>
      <h1>프로필</h1>
      <div>
        <p>
          <strong>[ email ]</strong> {userInfo.email}
        </p>
        <p>
          <strong>[ nickname ]</strong> {userInfo.nickname}
        </p>
      </div>
    </>
  );
}

export default Mypage;
