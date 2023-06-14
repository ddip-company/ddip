import BungaeListContent from "./BungaeListContent";
import TabMenu from "./TabMenu";

function UserBungaeList({ sortBy, onSwitchTab, tab, bungaeList }) {
  return (
    <>
      <div>
        <TabMenu sortBy={sortBy} onSwitch={onSwitchTab} tab={tab} />
      </div>
      <BungaeListContent bungaeList={bungaeList} />
    </>
  );
}

export default UserBungaeList;
