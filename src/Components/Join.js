import React, { useState, useEffect } from "react";
import axios from "axios";
import JoinSvg from "../Assets/Illustrates/JoinSvg";
import { joinStyles } from "../Styles/ComponentsStyle";
import Peer from "peerjs";
const Join = (props) => {
  const { button, inputs, container, form } = joinStyles;
  const [errorMessage, setError] = useState("");
  const [peer, setPeer] = useState();
  const joinMeet = async () => {
    if ((props.meet.conn_id !== "") & (props.meet.password !== "")) {
      await axios({
        method: "post",
        url: "http://localhost:3001/joinroom/",
        data: {
          participant: props.user.id,
          conn_id: props.meet.conn_id,
          password: props.meet.password,
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
    <div style={container}>
      <JoinSvg />
      <form style={form}>
        <input
          type="text"
          placeholder="Toplantı Id"
          style={inputs}
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
          style={inputs}
          onChange={(e) =>
            props.setMeet({
              ...props.meet,
              password: e.target.value,
            })
          }
          required
        />
        <br />
        <button
          className="btn btn-danger"
          style={button}
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
