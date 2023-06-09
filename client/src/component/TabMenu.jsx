import "./TabMenu.css";
import { useState } from "react";

function TabMenu({ sortBy, onSwitch, tab }) {
  const [selectedTab, setSelectedTab] = useState(null);

  const switchTabHandler = (selected) => {
    setSelectedTab(selected);
    onSwitch(selected);
  };

  return (
    <section className="tab-Wrapper">
      {tab.map((menu) => (
        <li
          className={`tab-li ${selectedTab === menu.linkTo ? "active" : ""}`}
          role="menuitem"
          key={menu.name}
          onClick={() => switchTabHandler(menu.linkTo)}
        >
          <div className="tab-menu">
            <div>{menu.name}</div>
            {menu.imageSrc && (
              <img
                src={`process.env.PUBLIC_URL + ${menu.imageSrc}`}
                alt={`${menu.imageAlt}`}
              />
            )}
          </div>
          {menu.sortBy.includes(sortBy)}
        </li>
      ))}
    </section>
  );
}

export default TabMenu;
