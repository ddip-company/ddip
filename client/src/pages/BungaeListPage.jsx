import Navbar from "../component/Navbar";
import SearchedBungaeList from "../component/SearchedBungaeList";
import { useEffect, useState } from "react";
import * as authApi from "../api/auth";
import { useSearchParams } from "react-router-dom";
import { searchPageTabMenu as tab } from "../static/sortTab";
import { sortByLatest, sortByDeadline } from "../util/sortFunctions";
import Footer from "./PageContent/Footer";

function BungaeListPage() {
  const [bungaeList, setBungaeList] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const sort = searchParams ? searchParams.get("sort") : null;

  useEffect(() => {
    const fetchBungaeList = async () => {
      try {
        const res = await authApi.bungaeList();
        let sortedList = [];

        // if (sort === "newest") {
        //   sortedList = sortByLatest(res.data);
        // } else if (sort === "last-minute") {
        //   sortedList = sortByDeadline(res.data);
        // } else {
        //   sortedList = res.data;
        // }
        switch (sort) {
          case "newest":
            sortedList = sortByLatest(res.data);
            break;
          case "last-minute":
            sortedList = sortByDeadline(res.data);
            break;
          default:
            sortedList = res.data;
        }

        setBungaeList(sortedList);
      } catch (error) {
        console.error("데이터 가져오기 실패:", error);
      }
    };
    fetchBungaeList();
  }, [sort]);

  const switchTabHandler = (selected) => {
    setSearchParams({ sort: selected });
  };

  return (
    <>
      <Navbar />
      <div className="search-container">
        <SearchedBungaeList
          count={bungaeList.length}
          tab={tab}
          onSwitch={switchTabHandler}
          sortBy={sort}
          bungaeList={bungaeList}
        />
      </div>
      <Footer />
    </>
  );
}

export default BungaeListPage;
