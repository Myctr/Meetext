import React, { useState } from "react";
import Menu from "../Components/Menu";
import Panel from "../Components/Panel";
import styles from "../Styles/InterfaceStyle";

const Interface = (props) => {
  const [activeMenu, setActiveMenu] = useState("create");

  const { row, container, menu, panel } = styles;
  return (
    <div className="container" style={container}>
      <Menu style={menu} active={activeMenu} setActive={setActiveMenu} />
      <div className="row" style={row}>
        <Panel style={panel} active={activeMenu} user={props.user} />
      </div>
    </div>
  );
};
export default Interface;
