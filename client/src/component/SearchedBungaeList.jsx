import TabMenu from "./UI/TabMenu";
import BungaeListContent from "./BungaeListContent";
import "../styles/css/SearchPage.css";

function SearchedBungaeList({ count, sortBy, onSwitch, tab, bungaeList }) {
  return (
    <section>
      <div className="search-wrapper">
        <h1 className="search-head">{`번개 검색 결과 (${count})`}</h1>
        <TabMenu sortBy={sortBy} onSwitch={onSwitch} tab={tab} />
      </div>
      <BungaeListContent bungaeList={bungaeList} />
    </section>
  );
}

export default SearchedBungaeList;
