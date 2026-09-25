import React, { useEffect, useState } from "react";
import { api } from "../api";
import { useTranslation } from "../i18n";

const Note = (props) => {
  const { language, t } = useTranslation();
  const [messages, setMessages] = useState([]);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    if (!props.meeting) return undefined;
    let isCurrent = true;
    setMessages([]);
    setStatus("loading");

    api
      .get(`/showmsg/${props.meeting.id}`)
      .then((response) => {
        if (!isCurrent) return;
        setMessages(response.data);
        setStatus("ready");
      })
      .catch(() => {
        if (isCurrent) setStatus("error");
      });

    return () => {
      isCurrent = false;
    };
  }, [props.meeting]);

  const formatDate = (timestamp) =>
    new Intl.DateTimeFormat(language === "tr" ? "tr-TR" : "en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(timestamp));

  if (!props.meeting) {
    return (
      <div className="note-view">
        <p className="panel-description">{t("notes.notFound")}</p>
      </div>
    );
  }

  return (
    <div className="note-view">
      <p className="auth-kicker">{t("notes.kicker")}</p>
      <div className="transcript-header">
        <div>
          <h1 className="panel-title">{props.meeting.name}</h1>
          <p className="panel-description">{t("notes.transcript")}</p>
        </div>
        <button
          className="primary-button print-button"
          type="button"
          onClick={() => window.print()}
          disabled={status !== "ready" || messages.length === 0}
        >
          {t("notes.savePdf")}
        </button>
      </div>
      {status === "loading" && (
        <p className="panel-description">{t("notes.loading")}</p>
      )}
      {status === "error" && (
        <p className="inline-error">{t("notes.failed")}</p>
      )}
      {status === "ready" && messages.length === 0 && (
        <p className="panel-description">{t("notes.empty")}</p>
      )}
      {status === "ready" && messages.length > 0 && (
        <div className="transcript-list">
          {messages.map((message) => (
            <article className="transcript-message" key={message.id}>
              <div>
                <strong>{message.sender_name}</strong>
                <time dateTime={new Date(message.created_at).toISOString()}>
                  {formatDate(message.created_at)}
                </time>
              </div>
              <p>{message.message}</p>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};

export default Note;
