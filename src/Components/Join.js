import React, { useState } from "react";
import { api } from "../api";
import JoinSvg from "../Assets/Illustrates/JoinSvg";
import Peer from "peerjs";
import DevicePreview from "./DevicePreview";
import { validatePassword, validateText, validationRules } from "../formValidation";
const Join = (props) => {
  const [errorMessage, setError] = useState("");
  const joinMeet = async (event) => {
    event.preventDefault();
    const connectionIdError = validateText(props.meet.conn_id, "Toplantı ID", validationRules.connectionId);
    const passwordError = validatePassword(props.meet.password, "Toplantı şifresi");
    if (connectionIdError || passwordError) {
      setError(connectionIdError || passwordError);
      return;
    }

    try {
        const response = await api.post("/joinroom", {
          conn_id: props.meet.conn_id,
          password: props.meet.password,
        });

        if (response.data === false) {
          setError("Toplantı id veya şifre yanlış!");
        } else {
          const peer = await new Promise((resolve, reject) => {
            const nextPeer = new Peer();
            nextPeer.on("open", () => resolve(nextPeer));
            nextPeer.on("error", reject);
          });
          props.setMeetingPeer(peer);
          props.setMeet(response.data);
          props.setActiveMenu("meet");
        }
    } catch (error) {
      setError("Toplantıya bağlanılamadı. Lütfen tekrar deneyin.");
    }
  };

  return (
    <div className="meeting-form-view">
      <div className="meeting-form-copy">
        <div className="meeting-illustration">
          <JoinSvg />
        </div>
        <div>
          <p className="auth-kicker">Mevcut alan</p>
          <h1 className="panel-title">Toplantıya katıl</h1>
          <p className="panel-description">
            Toplantı kimliğini ve şifresini girerek görüşmeye devam edin.
          </p>
        </div>
      </div>
      <DevicePreview onStreamReady={props.setLocalStream} />
      <form className="meeting-form" onSubmit={joinMeet} noValidate>
        <input
          type="text"
          placeholder="Toplantı Id"
          className="field-input"
          required
          autoComplete="off"
          onChange={(e) =>
            props.setMeet({
              ...props.meet,
              conn_id: e.target.value,
            })
          }
          minLength={validationRules.connectionId.minLength}
          maxLength={validationRules.connectionId.maxLength}
        />
        <br />
        <input
          type="password"
          placeholder="Toplantı Şifresi"
          className="field-input"
          required
          autoComplete="current-password"
          onChange={(e) =>
            props.setMeet({
              ...props.meet,
              password: e.target.value,
            })
          }
          minLength={validationRules.roomPassword.minLength}
          maxLength={validationRules.roomPassword.maxLength}
        />
        <br />
        <p className="inline-error" role="alert">
          {errorMessage}
        </p>
        <button
          className="primary-button"
          type="submit"
        >
          Katıl!
        </button>
      </form>
    </div>
  );
};

export default Join;
