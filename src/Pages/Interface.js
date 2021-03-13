import React from "react";
import styles from "../Styles/InterfaceStyle";
const Interface = () => {
  const { menu, panel } = styles;
  return (
    <div>
      <div style={menu}>Menü</div>
      <div style={panel}>Panel</div>
    </div>
  );
};
export default Interface;
