import React, { useState } from "react";
import Menu from "../Components/Menu";
import styles from "../Styles/InterfaceStyle";
import Create from "../Components/Create";
import Join from "../Components/Join";
import History from "../Components/History";
import Meet from "../Pages/Meet";

const Interface = (props) => {
  const [activeMenu, setActiveMenu] = useState("create");

  const { row, container, menu, panel } = styles;
  return (
    <div className="container" style={container}>
      <Menu style={menu} active={activeMenu} setActive={setActiveMenu} />
      {}
      <div className="row" style={row}>
        <div style={panel}>
          {(() => {
            switch (activeMenu) {
              case "create":
                return <Create setMeet={setActiveMenu} user={props.user} />;
              case "join":
                return <Join />;
              case "history":
                return <History />;
              case "meet":
                return <Meet />;
              default:
                return <Create />;
            }
          })()}
        </div>
      </div>
    </div>
  );
};
export default Interface;
