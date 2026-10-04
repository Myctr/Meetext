import React, { useState } from "react";
import { api } from "../api";
import CreateSvg from "../Assets/Illustrates/CreateSvg";
import Peer from "peerjs";
import DevicePreview from "./DevicePreview";
import {
  validatePassword,
  validateText,
  validationRules,
} from "../formValidation";
import { useTranslation } from "../i18n";
const Create = (props) => {
  const { t } = useTranslation();
  const [errorMessage, setError] = useState("");

  const createMeet = async (event) => {
    event.preventDefault();
    const nameError = validateText(
      props.meet.name,
      t("labels.meetingName"),
      validationRules.roomName,
      t,
    );
    const passwordError = validatePassword(
      props.meet.password,
      t("labels.meetingPassword"),
      t,
    );
    if (nameError || passwordError) {
      setError(nameError || passwordError);
      return;
    }

    try {
      const peer = await new Promise((resolve, reject) => {
        const nextPeer = new Peer();
        nextPeer.on("open", () => resolve(nextPeer));
        nextPeer.on("error", reject);
      });
      const response = await api.post("/createroom", {
        name: props.meet.name,
        password: props.meet.password,
        admin_id: props.user.id,
        conn_id: peer.id,
      });

      props.setMeetingPeer(peer);
      props.setMeet(response.data);
      props.onMeetingSaved(response.data);
      props.setActiveMenu("meet");
    } catch (error) {
      setError(t("create.failed"));
    }
  };
  return (
    <div className="meeting-form-view">
      <div className="meeting-form-copy">
        <div className="meeting-illustration">
          <CreateSvg />
        </div>
        <div>
          <p className="auth-kicker">{t("create.kicker")}</p>
          <h1 className="panel-title">{t("create.title")}</h1>
          <p className="panel-description">{t("create.description")}</p>
        </div>
      </div>
      <DevicePreview onStreamReady={props.setLocalStream} />
      <form className="meeting-form" onSubmit={createMeet} noValidate>
        <input
          type="text"
          placeholder={t("create.namePlaceholder")}
          className="field-input"
          required
          autoComplete="off"
          onChange={(e) =>
            props.setMeet({ ...props.meet, name: e.target.value })
          }
          minLength={validationRules.roomName.minLength}
          maxLength={validationRules.roomName.maxLength}
        />
        <br />
        <input
          type="password"
          placeholder={t("create.passwordPlaceholder")}
          className="field-input"
          required
          autoComplete="new-password"
          onChange={(e) =>
            props.setMeet({ ...props.meet, password: e.target.value })
          }
          minLength={validationRules.roomPassword.minLength}
          maxLength={validationRules.roomPassword.maxLength}
        />
        <br />
        <p className="inline-error" role="alert">
          {errorMessage}
        </p>
        <button className="primary-button" type="submit">
          {t("create.title")}
        </button>
      </form>
    </div>
  );
};

export default Create;
