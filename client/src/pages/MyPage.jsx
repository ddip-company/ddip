import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../store/auth-context";
import { useContext } from "react";
import { ProfilePageTabMenu as tab } from "../static/sortTab";
import * as authApi from "../api/auth";
import UserInfo from "../component/UserInfo";
import UserBungaeList from "../component/UserBungaeList";
import Navbar from "../component/Navbar";
import { sortByLatest } from "../util/sortFunctions";

function Mypage() {
  const { userInfo } = useContext(AuthContext);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [bungaeList, setBungaeList] = useState([]);
  const [checkUserId, setCheckUserId] = useState();

  useEffect(() => {
    const fetBungaeList = async () => {
      try {
        const res = await authApi.bungaeList();
        const data = await authApi.nicknameDuplication(userInfo.nickname);
        const userId = data.data.id;
        setCheckUserId(userId);
        setBungaeList(res.data);
      } catch (error) {
        console.error("데이터 가져오기 실패:", error);
      }
    };
    fetBungaeList();
  }, [userInfo.nickname]);

  const handleSwitchTab = (selected) => {
    navigate(selected);
  };

  if (!userInfo) return null;

  const bungaeCreatedByUser = sortByLatest(
    bungaeList.filter((item) => item.owner.id === checkUserId)
  );
  const bungaeParticipatedByUser = sortByLatest(
    bungaeList.filter((item) => item.participantIds.includes(checkUserId))
  );

  return (
    <>
      <Navbar />
      <UserInfo
        emoji={userInfo.emoji}
        nickname={userInfo.nickname}
        email={userInfo.email}
      />
      <div className="UserBungaeList-container">
        <UserBungaeList
          sortBy={pathname}
          onSwitchTab={handleSwitchTab}
          tab={tab}
          bungaeList={
            pathname === "/myPage/created"
              ? bungaeCreatedByUser
              : bungaeParticipatedByUser
          }
        />
      </div>
    </>
  );
}

export default Mypage;
