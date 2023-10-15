import { useEffect, useState } from "react";
import Navbar from "../component/Navbar";
import { dummyBungaeList } from "../static/dummy/bungaeList";
import SearchedBungaeList from "../component/SearchedBungaeList";
import { searchPageTabMenu as tab } from "../static/sortTab";
import { useSearchParams } from "react-router-dom";

function SearchPage() {
  const [bungaeList, setBungaeList] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const sort = searchParams.get("sort");

  useEffect(() => {
    setBungaeList(dummyBungaeList);
  }, []);

  const makeFilledBungaeList = (bungaeList) => {
    const filledBungaeList = bungaeList.slice();
    while (filledBungaeList.length < 4) {
      filledBungaeList.push(null);
    }
    return filledBungaeList;
  };

  const filledBungaeList = makeFilledBungaeList(bungaeList);

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
          bungaeList={filledBungaeList}
        />
      </div>
    </>
  );
}

export default SearchPage;
