import React, { useEffect, useState } from "react";
import axios from "axios";
import CreateSvg from "../Assets/Illustrates/CreateSvg";
import Peer from "peerjs";
const Create = (props) => {
  const [errorMessage, setError] = useState("");
  const [peer, setPeer] = useState();
  useEffect(() => {
    const P = new Peer();
    setPeer(P);
  }, []);

  const createMeet = async () => {
    if ((props.meet.name !== "") & (props.meet.password !== "")) {
      await axios({
        method: "post",
        url: "http://localhost:3001/createroom/",
        data: {
          name: props.meet.name,
          password: props.meet.password,
          admin_id: props.user.id,
          conn_id: peer.id,
          userid: props.user.id,
        },
      }).then((res) => {
        props.setMeet(res.data);
        props.setActiveMenu("meet");
      });
    } else {
      setError("Toplantı adı veya toplantı şifresi alanı boş bırakılamaz!");
    }
  };
  return (
    <div className="meeting-form-view">
      <div className="meeting-illustration"><CreateSvg /></div>
      <div>
        <p className="auth-kicker">Yeni alan</p>
        <h1 className="panel-title">Toplantı oluştur</h1>
        <p className="panel-description">Katılımcılarınızla paylaşabileceğiniz yeni bir PeerJS toplantı alanı açın.</p>
      </div>
      <form className="meeting-form">
        <input
          type="text"
          placeholder="Toplantı Adı"
          className="field-input"
          onChange={(e) =>
            props.setMeet({ ...props.meet, name: e.target.value })
          }
          required
        />
        <br />
        <input
          type="password"
          placeholder="Toplantı Şifresi"
          className="field-input"
          onChange={(e) =>
            props.setMeet({ ...props.meet, password: e.target.value })
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
            createMeet();
          }}
        >
          Toplantı oluştur
        </button>
      </form>
    </div>
  );
};

export default Create;
