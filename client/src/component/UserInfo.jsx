import "../pages/MyPage.css";

function UserInfo({ emoji, nickname, email, handleSubmitLogout }) {
  return (
    <>
      <section className="mypage-container">
        <form className="mypage-form">
          <h1 className="mypage-title">마이페이지</h1>
          <div className="mypage-emoji">🥦{emoji}</div>
          <p className="mypage-label">{nickname}</p>
          <p className="mypage-label">{email}</p>
        </form>
      </section>
    </>
  );
}

export default UserInfo;
