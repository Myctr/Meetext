import React from "react";
import { useTranslation } from "../i18n";
const Welcome = (props) => {
  const { t } = useTranslation();
  return (
    <div className="welcome-view">
      <p className="auth-kicker">{t("welcome.kicker")}</p>
      <h1 className="welcome-title">{t("welcome.title")}</h1>
      <p className="welcome-copy">
        {t("welcome.description")}
      </p>
      <button
        className="primary-button welcome-button"
        type="button"
        onClick={() => props.setActive("create")}
      >
        {t("welcome.action")}
      </button>
    </div>
  );
};
export default Welcome;
