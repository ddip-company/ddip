import { useEffect, useState } from "react";
import Navbar from "../component/Navbar";
import * as authApi from "../api/auth";
import BungaeListContent from "../component/BungaeListContent";
import { useLocation } from "react-router";
import Footer from "./PageContent/Footer";

function SearchPage() {
  const [bungaeList, setBungaeList] = useState([]);
  const { state } = useLocation();

  useEffect(() => {
    const currentSearchParams = {
      keyword: state.keyword,
      country: "",
      city: state.city,
      state: state.state,
      street: state.street,
      zipCode: "",
      detail: ""
    };

    const searchBungaeList = async () => {
      try {
        const res = await authApi.bungaeSearch(currentSearchParams);
        const filteredBungaeList = res.data.filter((item) => {
          return (
            item.numberOfParticipants < item.numberOfRecruits &&
            new Date(item.meetingAt) > new Date()
          );
        });
        setBungaeList(filteredBungaeList);
      } catch (error) {
        console.error("데이터 가져오기 실패:", error);
      }
    };
    searchBungaeList(currentSearchParams);
  }, [state.city, state.state, state.street, state.keyword]);

  return (
    <>
      <Navbar SearchPage={SearchPage} bungaeList={bungaeList} />
      <div className="search-container">
        <section>
          <div className="search-wrapper">
            {bungaeList.length === 0 ? (
              <h1 className="search-error">
                찾는 번개가 없습니다. 다른 키워드를 입력하세요! test
              </h1>
            ) : (
              <h1 className="search-head">{`번개 검색 결과 (${bungaeList.length})`}</h1>
            )}
          </div>
          <BungaeListContent bungaeList={bungaeList} />
        </section>
      </div>
      <Footer />
    </>
  );
}

export default SearchPage;
