import React, { useState } from "react";
import { api } from "../api";
import CreateSvg from "../Assets/Illustrates/CreateSvg";
import Peer from "peerjs";
import DevicePreview from "./DevicePreview";
import { validatePassword, validateText, validationRules } from "../formValidation";
const Create = (props) => {
  const [errorMessage, setError] = useState("");

  const createMeet = async (event) => {
    event.preventDefault();
    const nameError = validateText(props.meet.name, "Toplantı adı", validationRules.roomName);
    const passwordError = validatePassword(props.meet.password, "Toplantı şifresi");
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
        props.setActiveMenu("meet");
    } catch (error) {
      setError("Toplantı oluşturulamadı. Lütfen tekrar deneyin.");
    }
  };
  return (
    <div className="meeting-form-view">
      <div className="meeting-form-copy">
        <div className="meeting-illustration">
          <CreateSvg />
        </div>
        <div>
          <p className="auth-kicker">Yeni alan</p>
          <h1 className="panel-title">Toplantı oluştur</h1>
          <p className="panel-description">
            Katılımcılarınızla paylaşabileceğiniz yeni bir toplantı alanı açın.
          </p>
        </div>
      </div>
      <DevicePreview onStreamReady={props.setLocalStream} />
      <form className="meeting-form" onSubmit={createMeet} noValidate>
        <input
          type="text"
          placeholder="Toplantı Adı"
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
          placeholder="Toplantı Şifresi"
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
        <button
          className="primary-button"
          type="submit"
        >
          Toplantı oluştur
        </button>
      </form>
    </div>
  );
};

export default Create;
