import React from "react";
import { useTranslation } from "../i18n";

const Menu = (props) => {
  const { t } = useTranslation();
  const items = [
    ["create", t("menu.create")],
    ["join", t("menu.join")],
    ["history", t("menu.history")],
    ["profile", t("menu.profile")],
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
