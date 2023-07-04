import TabMenu from "./TabMenu";
import BungaeListContent from "./BungaeListContent";
import "../pages/SearchPage.css";

function SearchedBungaeList({ count, sortBy, onSwitch, tab, bungaeList }) {
  return (
    <section>
      <div className="search-Wrapper">
        <h1 className="Search-head">{`번개 검색 결과 (${count})`}</h1>
        <TabMenu sortBy={sortBy} onSwitch={onSwitch} tab={tab} />
      </div>
      <BungaeListContent bungaeList={bungaeList} />
    </section>
  );
}

export default SearchedBungaeList;
