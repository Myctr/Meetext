import React, { useState } from "react";
import Menu from "../Components/Menu";
import Panel from "../Components/Panel";
import styles from "../Styles/InterfaceStyle";

const Interface = () => {
  const [activeMenu, setActiveMenu] = useState("create");

  const { container, menu, panel } = styles;
  return (
    <div style={container}>
      <Menu style={menu} active={activeMenu} setActive={setActiveMenu} />
      <Panel style={panel} />
    </div>
  );
};
export default Interface;
