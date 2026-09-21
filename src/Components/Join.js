import React, { useState } from "react";
import axios from "axios";
import JoinSvg from "../Assets/Illustrates/JoinSvg";
const Join = (props) => {
  const [errorMessage, setError] = useState("");
  const joinMeet = async () => {
    if ((props.meet.conn_id !== "") & (props.meet.password !== "")) {
      await axios({
        method: "post",
        url: "http://localhost:3001/joinroom/",
        data: {
          participant: props.user.id,
          conn_id: props.meet.conn_id,
          password: props.meet.password,
        },
      }).then((res) => {
        if (res === false) {
          setError("Toplantı id veya şifre yanlış!");
        } else {
          props.setMeet(res.data);
          console.log(res.data);
          props.setActiveMenu("meet");
        }
      });
    } else {
      setError("Toplantı id ve şifre alanları boş bırakılamaz!");
    }
  };

  return (
    <div className="meeting-form-view">
      <div className="meeting-illustration"><JoinSvg /></div>
      <div>
        <p className="auth-kicker">Mevcut alan</p>
        <h1 className="panel-title">Toplantıya katıl</h1>
        <p className="panel-description">Toplantı kimliğini ve şifresini girerek görüşmeye devam edin.</p>
      </div>
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
        <p className="inline-error" role="alert">{errorMessage}</p>
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
