import BungaeListContent from "./BungaeListContent";
import TabMenu from "./TabMenu";

function UserBungaeList({ sortBy, onSwitchTab, tab, bungaeList }) {
  return (
    <section>
      <div className="mypage-Wrapper">
        <TabMenu sortBy={sortBy} onSwitch={onSwitchTab} tab={tab} />
      </div>
      <BungaeListContent bungaeList={bungaeList} />
    </section>
  );
}

export default UserBungaeList;
