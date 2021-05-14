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
      //hata burada
      await axios({
        method: "get",
        url:
          "http://localhost:3001/tbl_rooms/" +
          props.meet.conn_id +
          "&" +
          props.meet.password,
      }).then((res) => {
        console.log(res.data);
        props.setMeet({ ...props.meet, name: res.data.name });
        props.setMeet({ ...props.meet, admin_id: res.data.admin_id });
        props.setMeet({ ...props.meet, participant: props.user.id });
        console.log(props.meet);
        if (res.data === "Wrong") {
          setError("Toplantı id veya şifre hatalı!");
        } else {
          axios({
            method: "post",
            url: "http://localhost:3001/tbl_rooms/",
            data: {
              participant: props.user.id,
              conn_id: props.meet.conn_id,
              password: props.meet.password,
            },
          }).then((res) => {
            props.setActiveMenu("meet");
          });
        }
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
