import React from "react";

const Menu = (props) => {
  const items = [
    ["create", "Yeni toplantı"],
    ["join", "Toplantıya katıl"],
    ["history", "Toplantılarım"],
    ["profile", "Profilim"],
  ];

  return (
    <div className="workspace-menu">
      {items.map(([value, label]) => (
        <button
          key={value}
          type="button"
          className={
            props.active === value ? "menu-button is-active" : "menu-button"
          }
          onClick={() => props.setActive(value)}
        >
          {label}
        </button>
      ))}
    </div>
  );
};

export default Menu;
