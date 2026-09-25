import React from "react";
import { useTranslation } from "../i18n";

const Intro = () => {
  const { t } = useTranslation();
  return (
    <div className="auth-intro">
      <p className="auth-kicker">{t("intro.kicker")}</p>
      <h1 className="auth-title">
        Meet<span>ext</span>
      </h1>
      <p className="auth-subtitle">
        {t("intro.description")}
      </p>
    </div>
  );
};

export default Intro;
