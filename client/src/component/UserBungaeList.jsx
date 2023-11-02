import BungaeListContent from "./BungaeListContent";
import TabMenu from "./UI/TabMenu";

function UserBungaeList({ sortBy, onSwitchTab, tab, bungaeList }) {
  return (
    <section>
      <div className="mypage-wrapper">
        <TabMenu sortBy={sortBy} onSwitch={onSwitchTab} tab={tab} />
      </div>
      <BungaeListContent bungaeList={bungaeList} />
    </section>
  );
}

export default UserBungaeList;
