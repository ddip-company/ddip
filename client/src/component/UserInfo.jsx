import "../styles/css/MyPage.css";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

function UserInfo({ emoji, nickname, email, handleSubmitLogout }) {
  const navigate = useNavigate();
  return (
    <>
      <section className="mypage-container">
        <div className="mypage-form">
          <h1 className="mypage-title">프로필</h1>
          <div className="mypage-emoji">{emoji}</div>
          <p className="mypage-label">{nickname}</p>
          <p className="mypage-label">{email}</p>
          <Button
            onClick={() => navigate("/mypage/:nickname/modify")}
            margin2="margin2"
            styles="lightblue"
          >
            프로필 수정
          </Button>
        </div>
      </section>
    </>
  );
}

export default UserInfo;
