import React, { useEffect, useState } from "react";
import axios from "axios";
import { createStyles } from "../Styles/ComponentsStyle";
import CreateSvg from "../Assets/Illustrates/CreateSvg";
import Peer from "peerjs";
const Create = (props) => {
  const { button, inputs, container, form, error } = createStyles;
  const [meetName, setMeetName] = useState("");
  const [meetPass, setMeetPass] = useState("");
  const [errorMessage, setError] = useState("");
  const [peer, setPeer] = useState();
  useEffect(() => {
    const P = new Peer();
    console.log(P);
    setPeer(P);
  }, []);

  const createMeet = async () => {
    if ((meetName !== "") & (meetPass !== "")) {
      await axios({
        method: "post",
        url: "http://localhost:3001/tbl_rooms/",
        data: {
          name: meetName,
          password: meetPass,
          admin_id: props.user.id,
          conn_id: peer.id,
        },
      }).then((res) => {
        console.log(res.data);
        props.setMeet("meet");
      });
    } else {
      setError("Toplantı adı veya toplantı şifresi alanı boş bırakılamaz!");
    }
  };
  return (
    <div style={container}>
      <CreateSvg />
      <form style={form}>
        <input
          type="text"
          placeholder="Toplantı Adı"
          style={inputs}
          onChange={(e) => setMeetName(e.target.value)}
          required
        />
        <br />
        <input
          type="password"
          placeholder="Toplantı Şifresi"
          style={inputs}
          onChange={(e) => setMeetPass(e.target.value)}
          required
        />
        <br />
        <div className="badge bg-danger" style={error}>
          {errorMessage}
        </div>
        <br />
        <button
          className="btn btn-danger"
          style={button}
          onClick={(e) => {
            e.preventDefault();
            createMeet();
          }}
        >
          Oluştur!
        </button>
      </form>
    </div>
  );
};

export default Create;
