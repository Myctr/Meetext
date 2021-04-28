import React, { useState } from "react";
import axios from "axios";
import JoinSvg from "../Assets/Illustrates/JoinSvg";
import { joinStyles } from "../Styles/ComponentsStyle";
import Peer from "peerjs";
const Join = (props) => {
  const { button, inputs, container, form } = joinStyles;
  const [errorMessage, setError] = useState("");
  const [peer, setPeer] = useState();

  const joinMeet = async () => {
    if (
      (props.participant.conn_id !== "") &
      (props.participant.password !== "")
    ) {
      await axios({
        method: "post",
        url: "http://localhost:3001/tbl_rooms/",
        data: {
          participant: props.user.id,
          conn_id: props.participant.conn_id,
          password: props.participant.password,
        },
      }).then((res) => {
        console.log(res.data);
        props.setActiveMenu("meet");
      });
    } else {
      setError("Toplantı adı veya toplantı şifresi alanı boş bırakılamaz!");
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
            props.setParticipant({
              ...props.participant,
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
            props.setParticipant({
              ...props.participant,
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
