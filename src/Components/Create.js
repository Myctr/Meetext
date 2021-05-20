import React, { useEffect, useState } from "react";
import axios from "axios";
import { createStyles } from "../Styles/ComponentsStyle";
import CreateSvg from "../Assets/Illustrates/CreateSvg";
import Peer from "peerjs";
const Create = (props) => {
  const { button, inputs, container, form, error } = createStyles;
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
    <div style={container}>
      <CreateSvg />
      <form style={form}>
        <input
          type="text"
          placeholder="Toplantı Adı"
          style={inputs}
          onChange={(e) =>
            props.setMeet({ ...props.meet, name: e.target.value })
          }
          required
        />
        <br />
        <input
          type="password"
          placeholder="Toplantı Şifresi"
          style={inputs}
          onChange={(e) =>
            props.setMeet({ ...props.meet, password: e.target.value })
          }
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
