import React, { useEffect, useState } from "react";
import axios from "axios";
import { noteStyles } from "../Styles/ComponentsStyle";

const Note = (props) => {
  const [messages, setMessages] = useState();
  useEffect(() => {
    console.log(props.messageIndex);
    messageHandler();
    console.log(messages);
  }, []);
  const messageHandler = async () => {
    await axios({
      method: "get",
      url:
        "http://localhost:3001/showmsg/" +
        props.user.nickname +
        "&" +
        props.user.password +
        "&" +
        props.messageIndex,
    }).then((res) => {
      setMessages(res.data);
    });
  };
  const { container, header, note } = noteStyles;
  return (
    <div style={container}>
      <div style={header}>Matematik</div>
    </div>
  );
};

export default Note;
