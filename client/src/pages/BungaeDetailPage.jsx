import Navbar from "../component/Navbar";
import * as authApi from "../api/auth";
import { useEffect, useState } from "react";
import BungaeDetail from "../component/BungaeDetail";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../store/auth-context";
import { useContext } from "react";

function BungaeDetailPage() {
  const { userInfo } = useContext(AuthContext);
  const { id } = useParams();
  const [bungaeDetail, setBungaeDetail] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [checkUserId, setCheckUserId] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBungaeDetail = async () => {
      try {
        const res = await authApi.bungaeList();
        const selectedBungae = res.data.find(
          (item) => parseInt(item.id, 10) === parseInt(id, 10)
        );
        setBungaeDetail(selectedBungae);
        const data = await authApi.nicknameDuplication(userInfo.nickname);
        const userId = data.data.id;
        setCheckUserId(userId);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.error("데이터 가져오기 실패:", error);
        navigate("/login");
      }
    };
    fetchBungaeDetail();
  }, [id, userInfo.nickname, navigate]);

  if (isLoading) return <p className="loading">Loading...</p>;

  const participantIds = bungaeDetail.participantIds;
  const isParticipating = participantIds.includes(checkUserId);

  return (
    <>
      <Navbar />
      <BungaeDetail
        bungaeDetail={bungaeDetail}
        isParticipating={isParticipating}
      />
    </>
  );
}

export default BungaeDetailPage;
