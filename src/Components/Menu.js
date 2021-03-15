import React from "react";
import { menuStyles } from "../Styles/ComponentsStyle";

const Menu = (props) => {
  const { activeButton, buttons } = menuStyles;
  return (
    <div style={props.style}>
      <button
        type="button"
        className="btn btn-danger"
        style={props.active === "create" ? activeButton : buttons}
        onClick={() => {
          props.setActive("create");
        }}
      >
        Toplantı Oluştur
      </button>
      <button
        type="button"
        className="btn btn-danger"
        style={props.active === "join" ? activeButton : buttons}
        onClick={() => {
          props.setActive("join");
        }}
      >
        Toplantıya Katıl
      </button>
      <button
        type="button"
        className="btn btn-danger"
        style={props.active === "history" ? activeButton : buttons}
        onClick={() => {
          props.setActive("history");
        }}
      >
        Toplantılarım
      </button>
    </div>
  );
};

export default Menu;
