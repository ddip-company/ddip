import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../store/auth-context";
import { useContext } from "react";
import { ProfilePageTabMenu as tab } from "../static/sortTab";
import { dummyBungaeList } from "../static/dummy/bungaeList";
import UserInfo from "../component/UserInfo";
import UserBungaeList from "../component/UserBungaeList";
import Navbar from "../component/Navbar";

function Mypage() {
  const { userInfo } = useContext(AuthContext);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [bungaeList, setBungaeList] = useState([]);
  const authActions = useContext(AuthContext);

  useEffect(() => {
    setBungaeList(dummyBungaeList);
  }, []);

  const handleSubmitLogout = () => {
    authActions.logoutHandler();
    return navigate("/");
  };

  const handleSwitchTab = (selected) => {
    navigate(selected);
  };

  if (!userInfo) return;

  return (
    <>
      <Navbar />
      <UserInfo
        emoji={userInfo.emoji}
        nickname={userInfo.nickname}
        email={userInfo.email}
        handleSubmitLogout={handleSubmitLogout}
      />
      <div className="UserBungaeList-container">
        <UserBungaeList
          sortBy={pathname}
          onSwitchTab={handleSwitchTab}
          tab={tab}
          bungaeList={bungaeList}
        />
      </div>
    </>
  );
}

export default Mypage;
