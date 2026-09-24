import React, { useState } from "react";
import { api } from "../api";
import JoinSvg from "../Assets/Illustrates/JoinSvg";
import Peer from "peerjs";
import DevicePreview from "./DevicePreview";
const Join = (props) => {
  const [errorMessage, setError] = useState("");
  const joinMeet = async () => {
    if ((props.meet.conn_id !== "") & (props.meet.password !== "")) {
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
    } else {
      setError("Toplantı id ve şifre alanları boş bırakılamaz!");
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
      <form className="meeting-form">
        <input
          type="text"
          placeholder="Toplantı Id"
          className="field-input"
          onChange={(e) =>
            props.setMeet({
              ...props.meet,
              conn_id: e.target.value,
            })
          }
          required
        />
        <br />
        <input
          type="password"
          placeholder="Toplantı Şifresi"
          className="field-input"
          onChange={(e) =>
            props.setMeet({
              ...props.meet,
              password: e.target.value,
            })
          }
          required
        />
        <br />
        <p className="inline-error" role="alert">
          {errorMessage}
        </p>
        <button
          className="primary-button"
          onClick={(e) => {
            e.preventDefault();
            joinMeet();
          }}
        >
          Katıl!
        </button>
      </form>
    </div>
  );
};

export default Join;
