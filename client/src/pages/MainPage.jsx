import { useEffect, useState } from "react";
import Navbar from "../component/Navbar";
import "../styles/css/MainPage.css";
import BungaeListContent from "../component/BungaeListContent";
import * as authApi from "../api/auth";
import Slider from "../component/Slider";
import Footer from "./PageContent/Footer";

const MainPage = () => {
  const [closingSoonBungaeList, setClosingSoonBungaeList] = useState([]);
  const [recentBungaeList, setRecentBungaeList] = useState([]);

  const [currentPageClosingSoon, setCurrentPageClosingSoon] = useState(1);
  const [currentPageRealTime, setCurrentPageRealTime] = useState(1);
  const itemsPerPage = 4;

  useEffect(() => {
    const fetchBungaeList = async () => {
      try {
        const res = await authApi.bungaeList();
        const now = new Date();
        const koreaTimeOffset = 9 * 60;
        // 마감 임박 번개 필터링: 모임 시간까지 6시간 이내
        const closingSoonBungae = res.data.filter((item) => {
          const meetingTime = new Date(item.meetingAt).getTime();
          return (
            meetingTime - now <= 6 * 60 * 60 * 1000 && meetingTime - now > 0
          );
        });
        setClosingSoonBungaeList(closingSoonBungae);

        // 실시간 최신 번개 필터링: 글 작성 시간부터 6시간 이내
        const recentBungae = res.data.filter((item) => {
          const meetingTime = new Date(item.meetingAt).getTime();
          const createdAtTime =
            new Date(item.createdAt).getTime() + koreaTimeOffset * 60000;
          return (
            now - createdAtTime <= 6 * 60 * 60 * 1000 && meetingTime - now > 0
          );
        });
        setRecentBungaeList(recentBungae);
      } catch (error) {
        console.error("데이터 가져오기 실패:", error);
      }
    };
    fetchBungaeList();
  }, []);

  const makeFilledBungaeList = (bungaeList) => {
    const filledBungaeList = bungaeList.slice();
    while (filledBungaeList.length < 4) {
      filledBungaeList.push(null);
    }
    return filledBungaeList;
  };

  const handlePrevPageClosingSoon = () => {
    if (currentPageClosingSoon > 1) {
      setCurrentPageClosingSoon(currentPageClosingSoon - 1);
    }
  };

  const handleNextPageClosingSoon = () => {
    const totalPages = Math.ceil(closingSoonBungaeList.length / itemsPerPage);
    if (currentPageClosingSoon < totalPages) {
      setCurrentPageClosingSoon(currentPageClosingSoon + 1);
    }
  };

  const handlePrevPageRealTime = () => {
    if (currentPageRealTime > 1) {
      setCurrentPageRealTime(currentPageRealTime - 1);
    }
  };

  const handleNextPageRealTime = () => {
    const totalPages = Math.ceil(recentBungaeList.length / itemsPerPage);
    if (currentPageRealTime < totalPages) {
      setCurrentPageRealTime(currentPageRealTime + 1);
    }
  };

  const offsetClosingSoon = (currentPageClosingSoon - 1) * itemsPerPage;
  const offsetRealTime = (currentPageRealTime - 1) * itemsPerPage;

  const filledClosingSoonBungaeList = makeFilledBungaeList(
    closingSoonBungaeList
      .filter((item) => item.numberOfParticipants !== item.numberOfRecruits)
      .slice(offsetClosingSoon, offsetClosingSoon + itemsPerPage)
  );

  const filledRecentBungaeList = makeFilledBungaeList(
    recentBungaeList
      .filter((item) => item.numberOfParticipants !== item.numberOfRecruits)
      .slice(offsetRealTime, offsetRealTime + itemsPerPage)
  );

  return (
    <>
      <Navbar />
      <section className="main-container">
        <p className="main-title">CLOSING SOON</p>
        <div className="main-body">
          <div className="main-text">마감 임박 번개</div>
          <div>
            <img
              className="arrowImg"
              src={process.env.PUBLIC_URL + "/img/rightarrow.png"}
              alt="rightarrow img"
              onClick={handlePrevPageClosingSoon}
            />
            <img
              className="arrowImg"
              src={process.env.PUBLIC_URL + "/img/leftarrow.png"}
              alt="leftarrow img"
              onClick={handleNextPageClosingSoon}
            />
          </div>
        </div>
        <BungaeListContent bungaeList={filledClosingSoonBungaeList} />
        <Slider
          itemsPerPage={itemsPerPage}
          totalItems={closingSoonBungaeList.length}
          currentPage={currentPageClosingSoon}
          onPageChange={setCurrentPageClosingSoon}
        />
      </section>
      <section className="main-container">
        <p className="main-title">REAL TIME</p>
        <div className="main-body">
          <div className="main-text">실시간 최신 번개</div>
          <div>
            <img
              className="arrowImg"
              src={process.env.PUBLIC_URL + "/img/rightarrow.png"}
              alt="rightarrow img"
              onClick={handlePrevPageRealTime}
            />
            <img
              className="arrowImg"
              src={process.env.PUBLIC_URL + "/img/leftarrow.png"}
              alt="leftarrow img"
              onClick={handleNextPageRealTime}
            />
          </div>
        </div>
        <BungaeListContent bungaeList={filledRecentBungaeList} />
        <Slider
          itemsPerPage={itemsPerPage}
          totalItems={recentBungaeList.length}
          currentPage={currentPageRealTime}
          onPageChange={setCurrentPageRealTime}
        />
      </section>
      <Footer />
    </>
  );
};

export default MainPage;
