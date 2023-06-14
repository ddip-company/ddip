import Button from "./Button";
import { useNavigate } from "react-router-dom";

function UserInfo({ emoji, nickname, email, handleSubmitLogout }) {
  const navigate = useNavigate();
  return (
    <>
      <div className="emoji">{emoji}</div>
      <p className="nickname">{nickname}</p>
      <p className="email">{email}</p>
      <div>
        <Button onClick={() => navigate("/withdraw")}>회원 탈퇴</Button>
        <Button onClick={handleSubmitLogout}>로그아웃</Button>
      </div>
    </>
  );
}

export default UserInfo;
