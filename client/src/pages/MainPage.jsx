import { useEffect, useState } from "react";
import Navbar from "../component/Navbar";
import "./MainPage.css";
import { dummyBungaeList2 } from "../static/dummy/bungaeList";
import BungaeListContent from "../component/BungaeListContent";

const MainPage = () => {
  const [imminentBungaeList, setImminentBungaeList] = useState([]);
  const [newBungaeList, setNewBungaeList] = useState([]);

  useEffect(() => {
    setImminentBungaeList(dummyBungaeList2);
    setNewBungaeList(dummyBungaeList2);
  }, []);

  const makeFilledBungaeList = (bungaeList) => {
    const filledBungaeList = bungaeList.slice();
    while (filledBungaeList.length < 4) {
      filledBungaeList.push(null);
    }
    return filledBungaeList;
  };

  const filledImminentBungaeList = makeFilledBungaeList(imminentBungaeList);
  const filledNewBungaeList = makeFilledBungaeList(newBungaeList);
  return (
    <>
      <Navbar />
      <div className="main-container">
        <p className="main-title">CLOSING SOON</p>
        <div className="main-body">
          <div className="main-text">마감 임박 번개</div>
          <div>
            <img
              className="arrowImg"
              src={process.env.PUBLIC_URL + "/img/rightarrow.png"}
              alt="rightarrow img"
            />
            <img
              className="arrowImg"
              src={process.env.PUBLIC_URL + "/img/leftarrow.png"}
              alt="leftarrow img"
            />
          </div>
        </div>
        <BungaeListContent bungaeList={filledImminentBungaeList} />
      </div>
      <div className="main-container">
        <p className="main-title">REAL TIME</p>
        <div className="main-body">
          <div className="main-text">실시간 최신 번개</div>
          <div>
            <img
              className="arrowImg"
              src={process.env.PUBLIC_URL + "/img/rightarrow.png"}
              alt="rightarrow img"
            />
            <img
              className="arrowImg"
              src={process.env.PUBLIC_URL + "/img/leftarrow.png"}
              alt="leftarrow img"
            />
          </div>
        </div>
        <BungaeListContent bungaeList={filledNewBungaeList} />
      </div>
    </>
  );
};

export default MainPage;
