import React from "react";
import { useTranslation } from "../i18n";
const History = (props) => {
  const { t } = useTranslation();
  return (
    <div>
      <div className="section-heading">
        <p className="auth-kicker">{t("history.kicker")}</p>
        <h1 className="panel-title">{t("history.title")}</h1>
      </div>
      <div className="history-grid">
        {(props.history || []).map((room) => (
          <div className="history-card" key={room.id}>
            <h2 className="history-card-title">{room.name}</h2>
            <button
              className="secondary-button"
              type="button"
              onClick={(e) => {
                e.preventDefault();
                props.setMeeting(room);
                props.setActive("note");
              }}
            >
              {t("history.notes")}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default History;
